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
const excel = require("exceljs");

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

const getListPlan = async (request, response) => {
    try {
        const getPlanQuery = `
            SELECT p.id, p.name, u.full_name AS user_manage, p.fromDate, p.toDate, p.status
            FROM plans p LEFT JOIN users u ON p.user_manage = u.id
        `;
        const plans = await query(getPlanQuery);
        return response.status(200).json({
            status: "success",
            data: plans,
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};
const createPlan0 = async (request, response) => {
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

            let i = 1;
            let task_name, user_manage, fromDatePlan, toDatePlan;
            for (i; i < rows.length; i++) {
                const rowData = rows[i];
                if (rowData.length === 0) {
                    break;
                }
                if (rowData[0] === "Tên kế hoạch") {
                    task_name = rowData[1];
                }

                if (rowData[0] === "Người quản lý") {
                    user_manage = rowData[1];
                }
                const dates = rowData[1].split(" đến ");

                let convertStandardDate = (date) => {
                    let arrDate = date.split("-");
                    return arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
                };
                fromDatePlan = dates[0] ? convertStandardDate(dates[0]) : null;
                toDatePlan = dates[1] ? convertStandardDate(dates[1]) : null;
            }
            const userManage = await query(`SELECT id FROM users WHERE full_name = '${user_manage}'`);
            const insertPlanQuery = `
                INSERT INTO plans (name, user_manage, fromDate, toDate)
                VALUES ('${task_name}','${userManage[0].id}','${fromDatePlan}', '${toDatePlan}')
            `;
            await query(insertPlanQuery);
            const lastInsertIdResult = await query("SELECT LAST_INSERT_ID() as planId");
            const planId = lastInsertIdResult[0].planId;
            let j = i + 2;
            for (j; j < rows.length; j++) {
                const rowData = rows[j];
                const [task, employee, device, material, quantity, unit, fromDate, toDate] = rowData;
                const user = await query(`SELECT id FROM users WHERE full_name = '${employee}'`)
                let convertStandardDate = (date) => {
                    let arrDate = date.split("-");
                    return arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
                };
                let from_date = fromDate ? convertStandardDate(fromDate) : null;
                let to_date = toDate ? convertStandardDate(toDate) : null;
                const deviceId = await getDeviceIds(device);
                const materialId = await getMaterialIds(material);
                console.log(materialId);
                console.log(quantity);
                const insertDetailQuery = `
                    INSERT INTO detail_plan (plan_id, task, employee, device, material, quantity, unit, fromDate, toDate)
                    VALUES(${planId}, '${task}', '${user[0].id}', '${deviceId}', '${materialId}', '${quantity}', '${unit}', '${from_date}', '${to_date}')
                `;
                await query(insertDetailQuery);
            }

            return response.status(200).send(
                JSON.stringify({
                    message: "notify.message.importPlanSuccess",
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
const createPlan = async (request, response) => {
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

            let i = 1;
            let task_name, user_manage, fromDatePlan, toDatePlan;
            for (i; i < rows.length; i++) {
                const rowData = rows[i];
                if (rowData.length === 0) {
                    break;
                }
                if (rowData[0] === "Tên kế hoạch") {
                    task_name = rowData[1];
                }

                if (rowData[0] === "Người quản lý") {
                    user_manage = rowData[1];
                }
                const dates = rowData[1].split(" đến ");

                let convertStandardDate = (date) => {
                    let arrDate = date.split("-");
                    return arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
                };
                fromDatePlan = dates[0] ? convertStandardDate(dates[0]) : null;
                toDatePlan = dates[1] ? convertStandardDate(dates[1]) : null;
            }
            const userManage = await query(`SELECT id FROM users WHERE full_name = '${user_manage}'`);
            const insertPlanQuery = `
                INSERT INTO plans (name, user_manage, fromDate, toDate)
                VALUES ('${task_name}','${userManage[0].id}','${fromDatePlan}', '${toDatePlan}')
            `;
            await query(insertPlanQuery);
            const lastInsertIdResult = await query("SELECT LAST_INSERT_ID() as planId");
            const planId = lastInsertIdResult[0].planId;
            let j = i + 2;
            for (j; j < rows.length; j++) {
                const rowData = rows[j];
                const [task, employee, device, material, quantity, unit, fromDate, toDate] = rowData;
                const user = await query(`SELECT id FROM users WHERE full_name = '${employee}'`);
                let convertStandardDate = (date) => {
                    let arrDate = date.split("-");
                    return arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
                };
                let from_date = fromDate ? convertStandardDate(fromDate) : null;
                let to_date = toDate ? convertStandardDate(toDate) : null;
                const deviceId = await getDeviceIds(device);
                const materialId = await getMaterialIds(material);

                const quantities = typeof quantity === 'string' ? quantity.split(',').map(q => parseFloat(q)) : [parseFloat(quantity)];
                const insertDetailQuery = `
                INSERT INTO detail_plan (plan_id, task, employee, device, material, quantity, unit, fromDate, toDate)
                VALUES(${planId}, '${task}', '${user[0].id}', '${deviceId}', '${materialId}', '${quantity}', '${unit}', '${from_date}', '${to_date}')
            `;
                await query(insertDetailQuery);
                for (let k = 0; k < materialId.length; k++) {
                    const currentMaterialId = materialId[k];
                    const currentQuantity = quantities[k];

                    const updateMaterialQuery = `
                        UPDATE material
                        SET quantity = quantity - ${currentQuantity}
                        WHERE id = ${currentMaterialId}
                    `;
                    await query(updateMaterialQuery);
                }
            }

            return response.status(200).send(
                JSON.stringify({
                    message: "notify.message.importPlanSuccess",
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

const getDeviceIds = async (deviceNames) => {
    const deviceArray = deviceNames.split(", ");
    const deviceIds = [];

    for (const deviceName of deviceArray) {
        const getDeviceQuery = `SELECT id FROM devices WHERE device_name = '${deviceName.trim()}'`;
        const result = await query(getDeviceQuery);
        const deviceId = result[0].id;
        deviceIds.push(deviceId);
    }
    return deviceIds;
};
const getMaterialIds = async (materialNames) => {
    const materialArray = materialNames.split(", ");
    const materialIds = [];
    for (const material of materialArray) {
        const getMaterialQuery = `SELECT id FROM material WHERE name = '${material.trim()}'`;
        const result = await query(getMaterialQuery);
        const materialid = result[0].id;
        materialIds.push(materialid);
    }
    return materialIds;
};

const deletePlan = async (request, response) => {
    try {
        const planId = request.body.planId;

        const deleteQuery = `
            DELETE FROM plans WHERE id =${planId}
        `;
        await query(deleteQuery);
        return response.status(200).json({
            status: "success",
            message: "notify.message.deletePlanSuccess",
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const getDetailPlan = async (request, response) => {
    try {
        const planId = request.body.planId;

        const getPlanQuery = `
            SELECT p.id, p.name, us.full_name AS user_manage, p.fromDate, p.toDate, p.status
            FROM plans p LEFT JOIN users us ON p.user_manage = us.id
            WHERE p.id = ${planId}
        `;
        const plan = await query(getPlanQuery);
        const getListQuery = await query(`SELECT * FROM detail_plan WHERE plan_id = ${planId}`);

        const requestData = plan.map(request => {
            return {
                id: request.id,
                userCreated: request.user_created,
                taskName: request.task_name,
                userManage: request.user_manage,
                fromDate: request.fromDate,
                toDate: request.toDate,
                status: request.status,
                detail: getListQuery.filter(detail => detail.plan_id === request.id)
            };
        });
        return response.status(200).json({
            status: "success",
            data: requestData,
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const getListTask = async (request, response) => {
    try {
        const userId = request.userId;

        const getTaskQuery = `
            SELECT dp.id, dp.plan_id, p.name, us.full_name AS name_manage, dp.task, 
            dp.employee, us.full_name, dp.device,
            (
                SELECT GROUP_CONCAT(device_name  SEPARATOR ', ') 
                FROM devices 
                WHERE FIND_IN_SET(id, dp.device)
            ) AS device_names,
             dp.material,
                (
                    SELECT GROUP_CONCAT(name SEPARATOR ', ') 
                    FROM material 
                    WHERE FIND_IN_SET(id, dp.material)
                ) AS material_names, dp.quantity, dp.unit, dp.status, dp.fromDate, dp.toDate
            FROM detail_plan dp 
            LEFT JOIN plans p ON p.id = dp.plan_id 
            LEFT JOIN users us ON us.id = dp.employee
            WHERE dp.employee = ${userId}
        `;
        const task = await query(getTaskQuery);
        return response.status(200).json({
            status: "success",
            data: task,
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const updateProcess = async (request, response) => {
    try {
        // const detailID = request.params.detailId;
        const planId = request.body.planId;
        const userId = request.userId;
        const status = request.body.status;
        const updateQuery = `UPDATE detail_plan SET status = ${status} WHERE plan_id = ${planId} AND employee= ${userId}`;
        await query(updateQuery);
        const checkStatusQuery = `
            SELECT COUNT(*) AS total, SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS totalStatusOne
            FROM detail_plan WHERE plan_id = ${planId}
        `;
        const statusResult = await query(checkStatusQuery);

        const total = statusResult[0].total;
        const totalStatusOne = statusResult[0].totalStatusOne;

        if (total === totalStatusOne) {
            const updatePlanStatusQuery = `UPDATE plans SET status = 1 WHERE id = ${planId}`;
            await query(updatePlanStatusQuery);
        }
        return response.status(200).json({
            status: "success",
            message: "notify.message.updateProcessSuccess",
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};
const acceptTheProduct = async (request, response) => {
    try {
        const planId = request.body.planId;
        const updateQuery = `UPDATE plans SET acceptance = 1 WHERE id = ${planId}`;
        await query(updateQuery);
        return response.status(200).json({
            status: "success",
            message: "notify.message.acceptTheProductSuccess",
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const reportProcess = async (request, response) => {
    const userId = request.userId;
    const planId = request.body.id;
    const mode = request.body.mode;

    try {
        let workspaceName = "";
        const workspace = await query(`
              SELECT w.name FROM workspaces w LEFT JOIN users u ON u.workspace_id = w.id WHERE u.id='${userId}'
          `);

        if (workspace.length > 0) {
            workspaceName = workspace[0].name;
        }
        const plan = await query(`
              SELECT p.name, u.full_name AS manager, p.fromDate, p.toDate,
                  CASE 
                      WHEN p.status = 1 THEN 'Đã hoàn thành'
                      ELSE 'Đang thực hiện'
                  END AS status
              FROM plans p LEFT JOIN users u ON p.user_manage = u.id 
              WHERE p.id='${planId}' 
          `);
        if (plan.length > 0) {
            const planDetail = await query(`
              SELECT dp.plan_id, dp.task, u.full_name, 
                  (
                      SELECT GROUP_CONCAT(device_name  SEPARATOR ', ') 
                      FROM devices 
                      WHERE FIND_IN_SET(id, dp.device)
                  ) AS device_names,
                  (
                      SELECT GROUP_CONCAT(name SEPARATOR ', ') 
                      FROM material 
                      WHERE FIND_IN_SET(id, dp.material)
                  ) AS material_names, 
                  dp.quantity, dp.unit, dp.fromDate, dp.toDate, 
                  CASE 
                      WHEN dp.status = 1 THEN 'Đã hoàn thành'
                      ELSE 'Đang thực hiện'
                  END AS status
              FROM detail_plan dp LEFT JOIN users u ON u.id = dp.employee
              WHERE plan_id = ${planId}
              ORDER BY dp.fromDate
          `);

            if (planDetail.length > 0) {
                const workbook = new excel.Workbook();
                const worksheet = workbook.addWorksheet("Báo cáo tiến độ sản xuất", {
                    views: [{ showGridLines: false }],
                });
                worksheet.getCell("A1").value = "XƯỞNG SƠN CẢNH ĐÔNG";
                worksheet.getCell("A2").value = workspaceName;
                worksheet.getCell("A3").value = "BÁO CÁO TIẾN ĐỘ SẢN XUẤT";
                worksheet.addRow([]);
                let fromDate =
                    plan[0].fromDate.split("-")[2] +
                    "-" +
                    plan[0].fromDate.split("-")[1] +
                    "-" +
                    plan[0].fromDate.split("-")[0];
                let toDate =
                    plan[0].toDate.split("-")[2] +
                    "-" +
                    plan[0].toDate.split("-")[1] +
                    "-" +
                    plan[0].toDate.split("-")[0];
                worksheet.addRow([
                    "Tên kế hoạch:",
                    plan[0].name,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);
                worksheet.addRow([
                    "Người quản lý:",
                    plan[0].manager,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);
                worksheet.addRow([
                    "Thời gian:",
                    fromDate + " đến " + toDate,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);
                worksheet.addRow([
                    "Trạng thái:",
                    plan[0].status,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);
                worksheet.addRow([]);
                worksheet.addRow([
                    "STT",
                    "Công việc",
                    "Nhân viên",
                    "Thiết bị",
                    "Nguyên vật liệu",
                    "Số lượng",
                    "Đơn vị tính",
                    "Ngày bắt đầu",
                    "Ngày kết thúc",
                    "Trạng thái",
                ]);

                for (let i = 0; i < planDetail.length; i++) {
                    worksheet.addRow([
                        i + 1,
                        planDetail[i].task,
                        planDetail[i].full_name,
                        planDetail[i].device_names,
                        planDetail[i].material_names,
                        planDetail[i].quantity,
                        planDetail[i].unit,
                        planDetail[i].fromDate,
                        planDetail[i].toDate,
                        planDetail[i].status,
                    ]);
                }

                worksheet.addRow([]);
                const rowCount = worksheet.rowCount;
                worksheet.getCell(`H${rowCount + 1}`).value =
                    "Hà Nội, ngày ... tháng ... năm .....";
                worksheet.getCell(`H${rowCount + 2}`).value = "NGƯỜI KIỂM TRA";

                // set width for columns
                const columnWidths = [18, 35, 25, 35, 35, 15, 20, 20, 20, 20];
                columnWidths.forEach((width, index) => {
                    worksheet.getColumn(index + 1).width = width;
                });

                worksheet.mergeCells("A1:C1");
                worksheet.mergeCells("A2:C2");
                worksheet.mergeCells("A3:J3");
                worksheet.mergeCells(`H${rowCount + 1}:J${rowCount + 1}`);
                worksheet.mergeCells(`H${rowCount + 2}:J${rowCount + 2}`);

                // set height for all rows
                for (let i = 1; i <= rowCount; i++) {
                    worksheet.getRow(i).height = 18;
                }

                if (mode === "preview") {
                    const bookjson = [];
                    workbook.eachSheet((sheet) => {
                        const sheetjson = [];
                        worksheet.eachRow((row) => {
                            sheetjson.push(row.values);
                        });
                        bookjson.push(sheetjson);
                    });

                    return response.status(200).json({
                        bookjson,
                    });
                } else {
                    response.setHeader(
                        "Content-Type",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    );
                    response.setHeader(
                        "Content-Disposition",
                        "attachment; filename=" + "tien-do-san-xuat.xlsx"
                    );

                    return workbook.xlsx.write(response).then(() => response.end());
                }
            }
        } else {
            return helper.Helper.badRequestReturn("nodata", response);
        }
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};


module.exports = {
    getListPlan,
    createPlan,
    deletePlan,
    getDetailPlan,
    getListTask,
    updateProcess,
    acceptTheProduct,
    reportProcess
};