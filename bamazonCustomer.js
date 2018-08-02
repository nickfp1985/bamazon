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
        promptUser();
    })
}


// ask users what and how many they would like to buy
function promptUser() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the product ID that you would like to buy.'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units would you like to buy?'
        }
    ]).then(function(answer) {
        console.log('Customer has selected: \n    id = '  + answer.id + '\n    quantity = ' + answer.quantity);
        
        let itemToBuy = answer.id;
        let qtyToBuy = answer.quantity;

        // Query db to confirm that the given item ID exists in the desired quantity
		let queryString = 'SELECT * FROM products WHERE ?';

		connection.query(queryString, {id: itemToBuy}, function(err, data) {
            if (err) throw err;

            let itemData = data[0];
            // console.log('itemData = ' + JSON.stringify(itemData));
            // console.log('itemData.quantity = ' + itemData.quantity);

            if (qtyToBuy <= itemData.stock_quantity) {
                console.log("You're in luck, we have enough in stock!");
            } else {
                console.log('Sorry, not enough of this product in stock for your order.')
                promptUser();
            }
        })
    })
}

function start() {
    displayProducts();
}

start();