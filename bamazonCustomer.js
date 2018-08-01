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

// connect to server and database
connection.connect(function(err) {
    if (err) throw err;
    startApp();
})

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;

        console.log('')
    })
}

// ask users what and how many they would like to buy
function promptUsers() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Enter the product ID that you would like to buy.',
            validate: validateInput,
            filter: Number
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How many units would you like to buy?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function(answer) {
        
    })
}