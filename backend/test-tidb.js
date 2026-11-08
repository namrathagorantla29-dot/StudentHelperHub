require("dotenv").config();

const mysql = require("mysql2/promise");

async function testConnection() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.TIDB_HOST,
            port: Number(process.env.TIDB_PORT),
            user: process.env.TIDB_USER,
            password: process.env.TIDB_PASSWORD,
            database: process.env.TIDB_DATABASE,

            ssl: process.env.TIDB_ENABLE_SSL === "true"
                ? { minVersion: "TLSv1.2" }
                : undefined,

            enableKeepAlive: true,
            connectTimeout: 20000
        });

        const [rows] = await connection.query(
            "SELECT VERSION() AS version"
        );

        console.log("TiDB Connected Successfully!");
        console.log("Version:", rows[0].version);

    } catch (error) {
        console.error("Connection Failed:", error.message);
        console.error("Error Code:", error.code);

    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

testConnection();