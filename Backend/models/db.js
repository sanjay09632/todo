const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'role_based_todo'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
