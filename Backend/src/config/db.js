const mysql = require("mysql2")
require('dotenv').config()

const connectionPool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT
});

connectionPool.getConnection(function(err, connection) {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Database connected");
    connection.release();
});

module.exports =  connectionPool