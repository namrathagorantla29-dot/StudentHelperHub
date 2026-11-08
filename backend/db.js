const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 4000),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        minVersion: "TLSv1.2"
    },

    connectTimeout: 20000,

    waitForConnections: true,
    connectionLimit: 5,
    maxIdle: 5,
    idleTimeout: 60000,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL Connected Successfully ✅");
    connection.release();
});

module.exports = db;