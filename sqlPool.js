let mysql = require("mysql");

let pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dateStrings: true,
    queryTimeout: 60000,
});

pool.on("connection", function (connection) {
    connection.query('SET time_zone = "+7:00";', function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
});

const query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, conn) => {
            if (error) {
                reject(error);
            } else {
                conn.query(sql, values, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
                conn.release();
            }
        });
    });
};

module.exports = query;
