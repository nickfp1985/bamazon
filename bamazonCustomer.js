const mysql = require('mysql');
const inquirer = require('inquirer');

// create a connection to bamazonDB
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
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

function displayProducts() {
    connection.query('SELECT * FROM products', 'utf-8', function (err, data) {
        if (err) throw err;
        data.forEach(function (info) {
            console.log(`
               product:
               ==============================
               id: ${info.id}
               name: ${info.product_name}
               price: ${info.price}
               quantity: ${info.stock_quantity}
            `);
        });
    })
}


// ask users what and how many they would like to buy
// function promptUsers() {
//     inquirer.prompt([
//         {
//             name: 'id',
//             type: 'input',
//             message: 'Enter the product ID that you would like to buy.',
//             validate: validateInput,
//             filter: Number
//         },
//         {
//             name: 'quantity',
//             type: 'input',
//             message: 'How many units would you like to buy?',
//             validate: validateInput,
//             filter: Number
//         }
//     ]).then(function(answer) {

//     })
// }

function start() {
    displayProducts();
}

start();