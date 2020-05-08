const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

let connection;
// Create a connection to the database
if (process.env.JAWSDB_URL) {
  mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  });
}

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = connection;
