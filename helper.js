const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Helper = {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(6));
    },

    /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },

    /**
     * Gnerate Token
     * @param {string} id
     * @returns {string} token
     */
    generateToken(user) {
        let token = jwt.sign(
            {
                userId: user.id,
                role: user.role_id,
            },
            process.env.SECRET_KEY,
            { algorithm: "HS256", expiresIn: "24h" }
        );

        return token;
    },

    generateAdminToken(user) {
        let adminToken = jwt.sign(
            {
                userId: user.id,
                role: user.role_id,
            },
            process.env.SECRET_KEY,
            { algorithm: "HS256", expiresIn: "24h" }
        );

        return adminToken;
    },

    stringToInt(value) {
        if (value === null || value === "null" || value === "") {
            return null;
        } else if (value === undefined || value === "undefined") {
            return undefined;
        } else {
            return parseInt(value);
        }
    },

    parseInt(value) {
        if (value === null || value == undefined) {
            return 0;
        } else {
            return parseInt(value);
        }
    },

    /**
     * isValidEmail helper method
     * @param {string} email
     * @returns {Boolean} True or False
     */
    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    },

    checkNullOrEmpty(value) {
        if (value === null || value === undefined) {
            return true;
        } else if (typeof value === "string" || typeof value === "undefined") {
            return value === "undefined" ||
                value === "null" ||
                Object.keys(value).length === 0
                ? true
                : false;
        } else if (typeof value === "number") {
            return value === null;
        } else if (Array.isArray(value)) {
            return value.length === 0;
        } else return false;
    },

    isNumeric(num) {
        return !isNaN(num);
    },

    checkPhoneNumber(phone) {
        return phone.match(/^\d{10}$|^\d{12}$/);
    },

    dbErrorReturn(error, response) {
        console.log(error);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    },

    badRequestReturn(error, response) {
        return response.status(400).json({
            status: "error",
            message: error,
        });
    },

    forbiddenReturn(error, response) {
        return response.status(403).json({
            status: "error",
            message: error,
        });
    },

    methodNotAllowedReturn(error, response) {
        return response.status(405).json({
            status: "error",
            message: error,
        });
    },

    isAdmin(roleId) {
        const roleAdmin = [1];
        return roleAdmin.includes(roleId);
    },

    generateRandomCode() {
        return Math.floor(Math.random() * 89999998) + 10000001;
    },
};

module.exports = {
    Helper,
};
