const mysql = require('mysql');
const inquirer = require('inquirer');

// create a connection to bamazonDB
let connection = mysql.connection({
    host: 'localhost',
    port: 8080,
    user: 'root',
    password: 'rootroot',
    database: 'bamazonDB'
});
