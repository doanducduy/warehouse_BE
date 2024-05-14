const jwt = require("jsonwebtoken");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const AppError = require("./app_error");

module.exports = {
    validateToken: (req, res, next) => {
        let token = req.headers["authorization"];

        //if no token found, return response (without going to the next middelware)
        if (!token)
            return res.status(401).send("Access denied. No token provided.");
        else {
            if (token.startsWith("Bearer ")) {
                token = token.replace("Bearer ", "");
            } else {
                return res.status(401).send("Access denied. No token provided.");
            }
        }

        try {
            //if can verify the token, set req.user and pass to next middleware
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decoded.userId;
            req.role = decoded.role;
            next();
        } catch (ex) {
            //if invalid token
            return res.status(403).send("Invalid token.");
        }
    },

    validateAdminToken: (req, res, next) => {
        let token = req.headers["authorization"];

        //if no token found, return response (without going to the next middelware)
        if (!token)
            return res.status(401).send("Access denied. No token provided.");
        else {
            if (token.startsWith("Bearer ")) {
                token = token.replace("Bearer ", "");
            } else {
                return res.status(401).send("Access denied. No token provided.");
            }
        }

        try {
            //if can verify the token, set req.user and pass to next middleware
            let adminRole = [1, 2];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (!adminRole.includes(decoded.role)) {
                return res.status(403).send("Invalid token.");
            } else {
                req.userId = decoded.userId;
                req.role = decoded.role;
                next();
            }
        } catch (ex) {
            //if invalid token
            return res.status(403).send("Invalid token.");
        }
    },
    errorHandler: (err, req, res, next) => {
        console.log(err);
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                message: err.message,
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    },
};
