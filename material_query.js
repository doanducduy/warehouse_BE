const { request, response } = require("express");
const helper = require("./helper");
const query = require("./sqlPool");
const path = require("path");
const __basedir = path.resolve();
const multer = require("multer");
const { start } = require("repl");
const UPLOAD_DIR = path.join(__dirname, "data_checkin");
const xlsx = require("xlsx");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const AppError = require("./app_error");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },

    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage,
}).single("file");


function validateParameters(params, validate, validateType) {
    if (helper.checkNullOrEmpty(params)) {
        validate[validateType] = `validate.message.${validateType.replace(
            / *\[[^\]]*]/,
            ""
        )}Required`;
    }
}

const getListMaterial = async (request, response) => {
    try {
        const getListMaterialQuery = `SELECT * FROM material`;
        const material = await query(getListMaterialQuery);
        return response.status(200).json({
            status: "success",
            data: material,
        });
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const importRequest = async (request, response, next) => {
    upload(request, response, async function (err) {
        if (err) {
            console.log(err);
            return helper.Helper.badRequestReturn(
                { message: "formula.fileUploadError" },
                response
            );
        }
        let file = request.file;
        if (
            helper.Helper.checkNullOrEmpty(file) ||
            helper.Helper.checkNullOrEmpty(file.filename)
        ) {
            return next(
                new AppError(StatusCodes.BAD_REQUEST, "formula.fileUploadError")
            );
        }

        if (
            ![
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
            ].includes(file.mimetype)
        ) {
            return helper.Helper.badRequestReturn(
                { message: "error.message.invalidFile" },
                response
            );
        }

        let filePath = file ? __basedir + "/public/uploads/" + file.filename : "";

        try {
            const workbook = xlsx.readFile(filePath);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

            let i = 2;
            let task_name, user_created, user_manage;
            for (i; i < rows.length; i++) {
                const rowData = rows[i];
                if (rowData.length === 0) {
                    break;
                }
                if (rowData[0] === "Người tạo") {
                    user_created = rowData[1];
                }
                if (rowData[0] === "Người duyệt") {
                    user_manage = rowData[1];
                }
                if (rowData[0] === "Kế hoạch") {
                    task_name = rowData[1];
                }
            }
            const userCreated = await query(`SELECT id FROM users WHERE full_name = '${user_created}'`)
            const userManage = await query(`SELECT id FROM users WHERE full_name = '${user_manage}'`);
            const planId = await query(`SELECT id FROM plans WHERE name = '${task_name}'`);
            let j = i + 2;
            let purchaseRequestIDs = [];
            let purchaseRequestIDString = ''
            const insertQuery = `
                    INSERT INTO purchase_request (plan_id, user_id, user_approve)
                    VALUES(${planId[0].id}, '${userCreated[0].id}', '${userManage[0].id}')
                `;
            const result = await query(insertQuery);
            purchaseRequestIDs.push(result.insertId);
            purchaseRequestIDString += result.insertId + ',';
            for (j; j < rows.length; j++) {
                const rowData = rows[j];
                const [material, quantity, unit] = rowData;
                const materialId = await query(`SELECT id FROM material WHERE name = '${material}'`)

                const insertDetailQuery = `
                    INSERT INTO detail_request (resquest_id, material_id, quantity, unit)
                    VALUES(${result.insertId}, ${materialId[0].id}, ${quantity}, '${unit}')
                `;
                await query(insertDetailQuery);
            }
            purchaseRequestIDDString = purchaseRequestIDString.slice(0, -1);
            const insertApproveQuery = `
                    INSERT INTO approver (purchase_requestID, approve_user)
                    VALUES ('${purchaseRequestIDDString}', '${userManage[0].id}')
                `;
            await query(insertApproveQuery);

            return response.status(200).send(
                JSON.stringify({
                    message: "notify.message.importRequestSuccess",
                })
            );
        } catch (error) {
            console.log(error);
            return helper.badRequestReturn(
                { message: "formula.fileUploadError" },
                response
            );
        } finally {
            // removeFile(filePath);
        }
    });
};
const approveRequset = async (request, response) => {
    try {
        const approveUser = request.userId;
        const purchaseRequestID = request.body.requestId;
        const status = request.body.status;
        const reason = request.body.reason;

        const approveRequset = `
            UPDATE approver SET approve_user = '${approveUser}', status = ${status}, reason = '${reason}'
            WHERE purchase_requestID = '${purchaseRequestID}'
        `;
        await query(approveRequset);
        const updateQuery = `
            UPDATE purchase_request SET status = ${status}, reason = '${reason}' 
            WHERE id = ${purchaseRequestID}
        `;
        await query(updateQuery);
        if (status === 1) {
            const materials = await query(`SELECT material_id, quantity FROM detail_request WHERE resquest_id = '${purchaseRequestID}'`);
            for (let material of materials) {
                const updateMaterialQuery = `
                    UPDATE material 
                    SET quantity = quantity + ${material.quantity} 
                    WHERE id = ${material.material_id}
                `;
                await query(updateMaterialQuery);
            }
        }
        return response.status(200).json({
            status: "success",
            message: "notify.message.approveRequestSuccess",
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const getListRequest = async (request, response) => {
    try {
        const userId = request.userId;
        const getListRequestQuery = `
            SELECT pr.id, p.name AS plan, u.full_name AS user_approve, pr.date
            FROM purchase_request pr LEFT JOIN plans p ON p.id = pr.plan_id
            LEFT JOIN users u ON u.id = pr.user_approve
            WHERE user_id = ${userId}
        `;
        const requests = await query(getListRequestQuery);

        const getListQuery = await query(`SELECT * FROM detail_request`);

        const requestData = requests.map(request => {
            return {
                id: request.id,
                plan: request.plan,
                user_approve: request.user_approve,
                date: request.date,
                detail: getListQuery.filter(detail => detail.resquest_id === request.id)
            };
        });

        return response.status(200).json({
            status: "success",
            data: requestData
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const getListApprove = async (request, response) => {
    try {
        const userId = request.userId;
        const getListApprove = `
            SELECT a.id, a.purchase_requestID, u.full_name AS user_created, us.full_name AS user_approve, p.name, a.status, a.reason, a.date
            FROM approver a LEFT JOIN purchase_request pr ON a.purchase_requestID = pr.id
            LEFT JOIN users u ON u.id = pr.user_id
            LEFT JOIN users us ON us.id = a.approve_user
            LEFT JOIN plans p ON p.id = pr.plan_id
            WHERE a.approve_user = '${userId}'
        `;
        const approve = await query(getListApprove);

        for (const request of approve) {
            const detailQuery = `SELECT * FROM detail_request WHERE resquest_id = ${request.purchase_requestID}`;
            const details = await query(detailQuery);
            request.detail = details;
        }

        return response.status(200).json({
            status: "success",
            data: approve,
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

module.exports = {
    getListMaterial,
    approveRequset,
    getListRequest,
    getListApprove,
    importRequest,
};