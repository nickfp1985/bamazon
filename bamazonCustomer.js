const mysql = require('mysql');
const inquirer = require('inquirer');

// create a connection to bamazonDB
let connection = mysql.createConnection({
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

function displayProducts() {
    connection.query('SELECT * FROM products', function (err, data) {
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
                console.log("Your order is confirmed!");

                let newStockQty = itemData.stock_quantity - qtyToBuy;
                let totalAmount = qtyToBuy * itemData.price;
                let queryUpdate = 'UPDATE products SET ? WHERE ?';
                
                connection.query(queryUpdate, [{stock_quantity: newStockQty}, {id: itemToBuy}], function(err, data) {
                    if (err) throw err;
                    console.log('Your total comes to: $' + totalAmount);
                    connection.end();
                })
            } else {
                console.log('Sorry, not enough in stock.')
            }
        })
        promptUser();
    })
}

function start() {

    displayProducts();
}

start();
