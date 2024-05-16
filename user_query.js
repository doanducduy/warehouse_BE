const { request, response } = require("express");
const helper = require("./helper");
const query = require("./sqlPool");

const getListUsers0 = async (request, response) => {
    try {
        const page = request.query.page;
        const limit = request.query.limit;
        const offset = (page - 1) * limit;

        const getAllUsersQuery = `
            SELECT u.id, u.user_name, u.full_name, u.address, u.status, ws.name AS workspaceName, r.name AS roleName FROM users u 
            LEFT JOIN workspaces ws ON u.workspace_id = ws.id
            LEFT JOIN roles r ON u.role_id = r.id
            WHERE u.is_deleted = 0 AND u.status = 1 AND ws.is_deleted = 0
            ORDER BY u.id DESC LIMIT ${+limit} OFFSET ${+offset}     
        `;
        const users = await query(getAllUsersQuery);
        const totalUsersQuery = `
            SELECT COUNT(*) AS count
            FROM users u LEFT JOIN roles r ON u.role_id = r.id
            WHERE u.is_deleted=0 AND r.is_deleted=0
        `;
        const totalPageData = await query(totalUsersQuery);
        const totalCount = Math.ceil(+totalPageData[0]?.count);
        const totalPage = Math.ceil(+totalPageData[0]?.count / limit);
        return response.status(200).json({
            status: "success",
            data: {
                pagination: {
                    pageIndex: +page,
                    pageSize: +limit,
                    totalPage,
                    totalCount,
                },
                users,
            },
        });
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};
const getListUsers = async (request, response) => {
    try {

        const getAllUsersQuery = `
            SELECT u.id, u.user_name, u.full_name, u.address, u.status, ws.name AS workspaceName, r.name AS roleName FROM users u 
            LEFT JOIN workspaces ws ON u.workspace_id = ws.id
            LEFT JOIN roles r ON u.role_id = r.id
            WHERE u.is_deleted = 0 AND u.status = 1 AND ws.is_deleted = 0  
        `;
        const users = await query(getAllUsersQuery);
        return response.status(200).json({
            status: "success",
            data:
                users,
        },
        );
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};
const detailUser = async (request, response) => {
    try {
        const userId = request.body.userId;
        const getUserQuery = `
            SELECT u.id, u.user_name, u.full_name, u.address, u.status, ws.name AS workspaceName, r.name AS roleName FROM users u 
            LEFT JOIN workspaces ws ON u.workspace_id = ws.id
            LEFT JOIN roles r ON u.role_id = r.id
            WHERE u.is_deleted = 0 AND u.status = 1 AND u.id = ${userId}
        `;
        const user = await query(getUserQuery);
        return response.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const addUser = async (request, response) => {
    try {
        const userName = request.body.userName;
        const fullName = request.body.fullName;
        const address = request.body.address;
        const roleId = request.body.roleId;
        const workspaceId = request.body.workspaceId;

        let validate = {};
        if (helper.Helper.checkNullOrEmpty(userName)) {
            validate.userName = "validate.message.userNameRequired";
        }
        if (helper.Helper.checkNullOrEmpty(fullName)) {
            validate.fullName = "validate.message.Required";
        }
        if (helper.Helper.checkNullOrEmpty(address)) {
            validate.address = "validate.message.Required";
        }
        if (helper.Helper.checkNullOrEmpty(roleId)) {
            validate.roleId = "validate.message.Required";
        }
        if (helper.Helper.checkNullOrEmpty(workspaceId)) {
            validate.workspacId = "validate.message.Required";
        }
        if (Object.keys(validate).length > 0) {
            let message = validate;
            return helper.Helper.badRequestReturn(message, response);
        } else {
            const checkUserName = await query(`SELECT user_name FROM users WHERE is_deleted = 0 AND status = 1 AND user_name = '${userName}'`);
            if (checkUserName.length > 0) {
                let message = "validate.message.userNameExists";
                return helper.Helper.badRequestReturn(message, response);
            } else {
                let password = '123456';
                const hashPassword = helper.Helper.hashPassword(password);
                const addUserQuery = `
                    INSERT INTO users(user_name, full_name, password, address, role_id, workspace_id)
                    VALUES ('${userName}', '${fullName}','${hashPassword}', '${address}', ${roleId}, ${workspaceId})
                `;
                await query(addUserQuery);
                return response.status(200).json({
                    status: "success",
                    message: "notify.message.addUserSuccess",
                });
            }
        }
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};
const deleteUser = async (request, response) => {
    try {
        const userId = request.body.userId;
        const user = await query(
            `SELECT * FROM users WHERE id = ${userId} AND is_deleted = 0`
        );
        if (user.length > 0) {
            await query(`UPDATE users SET is_deleted = 1 WHERE id = ${userId}`);

            return response.status(200).json({
                status: "success",
                message: "notify.message.deleteUserSuccess",
            });
        } else {
            let message = "notify.message.userNotExits";
            return helper.Helper.badRequestReturn(message, response);
        }
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const updateUser = async (request, response) => {
    try {
        const userId = request.userId;
        const newUserName = request.body.username;
        const newFullName = request.body.full_name;
        const newAddress = request.body.address;
        const newStatus = request.body.status;

        let validate = {};
        if (helper.Helper.checkNullOrEmpty(newUserName)) {
            validate.username = "validate.message.usernameRequired";
        }
        if (helper.Helper.checkNullOrEmpty(newFullName)) {
            validate.full_name = "validate.message.fullNameRequired";
        }
        if (helper.Helper.checkNullOrEmpty(newAddress)) {
            validate.address = "validate.message.addressRequired";
        }
        if (helper.Helper.checkNullOrEmpty(newStatus)) {
            validate.status = "validate.message.statusRequired";
        }
        if (Object.keys(validate).length > 0) {
            let message = validate;
            return helper.Helper.badRequestReturn(message, response);
        } else {
            const updateUserQuery = `
                UPDATE users SET username = ${newUserName}, full_name = ${newFullName}, address = ${newAddress}, status = ${newStatus}
                WHERE id = ${userId} AND is_deleted = 0
            `;
            await query(updateUserQuery);
            return response.status(200).json({
                status: "success",
                message: "notify.message.updateUserSuccess",
            });
        }
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};

const getListRole = async (request, response) => {
    try {
        const getListRoleQuery = `SELECT * FROM roles WHERE status = 1 AND is_deleted =0`;
        const role = await query(getListRoleQuery);
        return response.status(200).json({
            status: "success",
            data: role,
        });
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};
module.exports = {
    getListUsers,
    detailUser,
    addUser,
    deleteUser,
    updateUser,
    getListRole,
};
