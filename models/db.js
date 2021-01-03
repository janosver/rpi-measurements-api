const mysql = require("mysql");
const dbConfig = require("../config/config.json");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.dbHost,
  user: dbConfig.dbUser,
  password: dbConfig.dbPassword,
  database: dbConfig.dbName
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;