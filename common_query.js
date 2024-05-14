const helper = require("./helper");
const query = require("./sqlPool");

const login = async (request, response) => {
    try {
        const { username, password } = request.body;
        let validate = {};
        if (helper.Helper.checkNullOrEmpty(username)) {
            validate.username = "validate.message.usernameRequired";
        }
        if (helper.Helper.checkNullOrEmpty(password)) {
            validate.password = "validate.message.passwordRequired";
        }

        if (Object.keys(validate).length > 0) {
            let message = validate;
            return helper.Helper.badRequestReturn(message, response);
        } else {
            const getUserQuery = `
                SELECT u.id, u.role_id, u.user_name, u.full_name, u.address, u.password, r.name AS role
                FROM users u LEFT JOIN roles r ON u.role_id = r.id 
                WHERE u.user_name= '${username}' AND u.status=1 AND u.is_deleted=0 AND r.is_deleted=0
            `;
            const user = await query(getUserQuery);
            if (user.length > 0) {
                let roleAdmin = [1, 2];
                if (helper.Helper.comparePassword(user[0].password, password)) {
                    let token = "";
                    if (roleAdmin.includes(user.role_id)) {
                        token = helper.Helper.generateAdminToken(user[0]);
                    } else {
                        token = helper.Helper.generateToken(user[0]);
                    }

                    return response
                        .status(200)
                        .header("Authorization", token)
                        .json({
                            status: "success",
                            data: {
                                token: token,
                                id: user[0].id,
                                role: user[0].role,
                                username: user[0].username,
                                fullname: user[0].full_name,
                                address: user[0].address,
                            },
                        });
                } else {
                    let message = "error.message.passwordIncorrect";
                    return helper.Helper.badRequestReturn(message, response);
                }
            } else {
                let message = "error.message.usernameIncorrect";
                return helper.Helper.badRequestReturn(message, response);
            }
        }
    } catch (error) {
        return helper.Helper.dbErrorReturn(error, response);
    }
};

module.exports = {
    login,
};
