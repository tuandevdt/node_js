const mysql = require("mysql2");

function connectDB() {
    const connection = mysql.createConnection({
        host: "127.0.0.1", // Host
        port: 3306,
        user: "root",
        password: "Tuandoan@2404",
        database: "nodeproject",
      });
      return connection
}

module.exports = connectDB()
