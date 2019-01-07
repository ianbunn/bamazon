var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    // Your username
    user: "root",
    // Your password
    password: "root",
    // Your db name
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

var products;

function afterConnection(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        products = res;
        inventoryActions();
    });

    function inventoryActions(){

        //inquire if user'd like to buy something
        inquirer
            .prompt({
                name: "inventory",
                type: "rawlist",
                message: "What would you like to do?",
                choices: ["View All Inventory", "View Low Inventory", "Add Inventory","Add New Product","End bamazon Manager Session"]
            })
            .then(function (answer) {
                switch (answer.inventory){
                    case "View All Inventory":
                        lookUpProducts();
                        break;
                    case "View Low Inventory":
                        viewLowInventory();
                        break;
                    case "Add Inventory":
                        addInventory();
                        break;
                    case "Add New Product":
                        addNewProduct();
                        break;
                    case "End bamazon Manager Session":
                        endSession();
                        break;
                }
            });
    }

    function lookUpProducts() {

        // instantiate
        var table = new Table({
            head: ['Item ID', 'Item Name', 'Item Price', 'Stock Quantity']
            , colWidths: [9, 50, 15, 20]
        });

        for (v in products) {
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            table.push(
                [products[v].item_id, products[v].product_name, products[v].price, products[v].stock_quantity]
            );
        }

        console.log(table.toString());
        inventoryActions();
    }

    function viewLowInventory(){
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
            if (err) throw err;
            // instantiate
            var table = new Table({
                head: ['Item ID', 'Item Name', 'Item Price', 'Stock Quantity']
                , colWidths: [9, 50, 15, 20]
            });

            for (v in res) {
                // table is an Array, so you can `push`, `unshift`, `splice` and friends
                table.push(
                    [res[v].item_id, res[v].product_name, res[v].price, res[v].stock_quantity]
                );
            }

            console.log(table.toString());
            inventoryActions();
        });
    }

    function addInventory(){
        inquirer
            .prompt([{
                name: "itemId",
                type: "input",
                message: "What is the item ID you'd like to increase inventory for?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to add?"
            }])
            .then(function (answer) {
                var newQ = parseInt(products[answer.itemId-1].stock_quantity) + parseInt(answer.quantity);
                connection.query(`UPDATE products SET stock_quantity = ${newQ} WHERE item_id = ${answer.itemId}`, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                })
                connection.query(`SELECT * FROM products WHERE item_id = ${answer.itemId}`, function (err, newLoad) {
                    if (err) throw err;
                    console.log(`The new quantity for your ${newLoad[0].product_name} is ${newLoad[0].stock_quantity} units`);
                })
                endSession();
            });
    }

    function addNewProduct(){
        inquirer
            .prompt([{
                name: "productName",
                type: "input",
                message: "What is the new item's name?"
            },
            {
                name: "departmentName",
                type: "input",
                message: "What is the new item's department name?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the new item's price?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units for the new item added?"
            }
        ])
            .then(function (answer) {
                connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${answer.productName}","${answer.departmentName}",${answer.price},${answer.quantity})`, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                })
                
                endSession();
            });
    }

    function endSession(){
        connection.end();
    }
}
