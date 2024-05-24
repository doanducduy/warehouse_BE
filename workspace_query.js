const { response, request } = require("express");
const helper = require("./helper");
const query = require("./sqlPool");

const getListWorkspace = async (request, response) => {
    try {
        const userId = request.userId;

        let getWorkspaceQuery = `
            SELECT ws.id, ws.code, ws.name, ws.address, ws.user_id, u.full_name AS leader, ws.status
            FROM workspaces ws LEFT JOIN users u ON ws.user_id = u.id
            WHERE ws.is_deleted = 0 AND ws.status = 1 
        `;
        const workspaces = await query(getWorkspaceQuery);
        return response.status(200).json({
            status: "success",
            data: workspaces,
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};
const getUserIsEmployee = async (request, response) => {
    try {
        const getUserIsEmployeeQuery = `SELECT 
        id, 
        CONCAT(user_name, ' - ', full_name) AS full_name
    FROM 
        users 
    WHERE 
        role_id = 4 AND status = 1 AND is_deleted = 0`;
        const users = await query(getUserIsEmployeeQuery);
        return response.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
}
const createWorkspace = async (request, response) => {
    try {
        const userId = request.body.userId;
        const name = request.body.name;
        const address = request.body.address;
        let validate = {};
        if (helper.Helper.checkNullOrEmpty(name)) {
            validate.name = "validate.message.nameRequired";
        }
        if (helper.Helper.checkNullOrEmpty(address)) {
            validate.address = "validate.message.addressRequired";
        }
        if (Object.keys(validate).length) {
            let message = validate;
            return helper.Helper.badRequestReturn(message, response);
        } else {
            let code;
            let isCodeExists = true;
            while (isCodeExists) {
                code = helper.Helper.generateRandomCode().toString();
                const checkCodeExistedQuery = ` SELECT COUNT(*) AS count FROM workspaces WHERE code= ${code}`;
                const codeExisted = await query(checkCodeExistedQuery);
                if (Object.keys(codeExisted).length > 0) {
                    const count = codeExisted[0].count;
                    if (count === 0) {
                        isCodeExists = false;
                    }
                }
            }
            const insertWorkspaceQuery = `
                INSERT INTO workspaces (code, name, address, user_id)
                VALUES (${code}, '${name}', '${address}', ${userId})
            `;
            await query(insertWorkspaceQuery);
            const lastInsertedIdQuery = `SELECT LAST_INSERT_ID() AS lastId`;
            const result = await query(lastInsertedIdQuery);
            const workspaceId = result[0].lastId;
            const updateRoleQuery = `UPDATE users SET role_id = 3, workspace_id = ${workspaceId} WHERE id = ${userId} `;
            await query(updateRoleQuery);
            return response.status(200).json({
                status: "success",
                message: "notify.message.addWorkspaceSuccess",
            });
        }
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
}
const updateWorkspace = async (request, response) => {
    try {
        const workspaceId = request.body.id;
        const newName = request.body.name;
        const newAddress = request.body.address;
        const newStatus = request.body.status;

        let validate = {};
        if (helper.Helper.checkNullOrEmpty(newName)) {
            validate.name = "validate.message.nameRequired";
        }
        if (helper.Helper.checkNullOrEmpty(newAddress)) {
            validate.address = "validate.message.addressRequired";
        }

        if (Object.keys(validate).length > 0) {
            let message = validate;
            return helper.Helper.badRequestReturn(message, response);
        } else {
            const getWorkspaceQuery = `SELECT * FROM workspaces WHERE id = ${workspaceId} AND is_deleted = 0`;
            const workspace = await query(getWorkspaceQuery);
            if (Object.keys(workspace).length > 0) {
                const updateWorkspaceQuery = `
                    UPDATE workspaces SET name = '${newName}', address = '${newAddress}', status = ${newStatus} WHERE id = ${workspaceId}
                `;
                await query(updateWorkspaceQuery);
                return response.status(200).json({
                    status: "success",
                    message: "notify.message.updateWorkspaceSuccess",
                });
            } else {
                let message = "error.message.workspaceNotExits";
                return helper.Helper.badRequestReturn(message, response);
            }
        }
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const deleteWorkspace = async (request, response) => {
    try {
        const workspaceId = request.body.id;
        const getWorkspaceQuery = `SELECT * FROM workspaces WHERE id=${workspaceId} AND is_deleted=0`;
        const workspace = await query(getWorkspaceQuery);
        if (Object.keys(workspace).length > 0) {
            const deleteWorkspaceQuery = `UPDATE workspaces SET is_deleted = 1 WHERE id=${workspaceId}`;
            await query(deleteWorkspaceQuery);
            return response.status(200).json({
                status: "success",
                message: "notify.message.deleteWorkspaceSuccess",
            });
        } else {
            let message = "error.message.workspaceNotExits";
            return helper.Helper.badRequestReturn(message, response);
        }
    } catch (error) {
        console.log(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const getWorkspaceById = async (request, response) => {
    try {
        const getWorkspaceQuery = `
            SELECT ws.*, u.full_name AS leader FROM workspaces ws LEFT JOIN users u ON ws.user_id = u.id WHERE ws.id = ${workspaceId} AND ws.is_deleted= 0
        `;
        const workspace = await query(getWorkspaceQuery);
        return response.status(200).json({
            status: "success",
            data: workspace,
        });
    } catch (error) {
        console.error(error);
        return helper.Helper.dbErrorReturn(error, response);
    }
};

module.exports = {
    getListWorkspace,
    getUserIsEmployee,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    getWorkspaceById,
};
