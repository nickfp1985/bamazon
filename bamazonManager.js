const mysql = require('mysql');
const inquirer = require('inquirer');

// create a connection to bamazonDB
let connection = mysql.connection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: 'root',
    password: 'rootroot',
    database: 'bamazonDB'
});

// connect to server and database
connection.connect(function (err) {
    if (err) throw err;
    console.log('hola connection please');
    return;
})
