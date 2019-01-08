var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    afterConnection();
});

var products;

function afterConnection(){
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", function(err,res){
        if(err) throw err;
        products = res
        lookUpProducts();
    });

    function lookUpProducts (){
        // instantiate
        var table = new Table({
            head: ['Item ID', 'Item Name', 'Item Price']
            , colWidths: [9, 50, 15]
        });
        for (v in products) {
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            table.push(
                [products[v].item_id, products[v].product_name, products[v].price]
            );
        }
        console.log(table.toString());
        userPurchase();
    }

    function userPurchase (){
        //inquire if user'd like to buy something
        inquirer
            .prompt({
                name: "purchase",
                type: "rawlist",
                message: "Would you like to purchase an item?",
                choices: ["Yes", "No"]
            })
            .then(function (answer) {
                if (answer.purchase === "Yes") {
                    inquirer
                        .prompt([{
                            name: "itemId",
                            type: "input",
                            message: "What is the item ID you'd like to purchase?"
                        },
                        {
                            name: "itemQuantity",
                            type: "input",
                            message: "How many items would you like?"
                        }]).then(function(itemDetails){
                            var itemIdProductsArr = itemDetails.itemId - 1;
                            var itemId = itemDetails.itemId
                            var itemQ = itemDetails.itemQuantity;
                            checkInventory(itemIdProductsArr,itemQ,itemId);
                            // connection.end();
                        })
                }
                else {
                    console.log("Thank you for visiting bamazon! Come back soon!")
                }
            });
    }

    function checkInventory(itemIdProductsArr,itemQ){
        if (itemIdProductsArr in products && itemQ <= products[itemIdProductsArr].stock_quantity) {
            var totalSale = parseFloat(products[itemIdProductsArr].price * itemQ).toFixed(2);
            var newQ = parseInt(products[itemIdProductsArr].stock_quantity - itemQ);
            var stockItemId = itemIdProductsArr + 1;
            console.log(`Your total is $${totalSale}. Put that cash in my hand!`)
            updateInventory(stockItemId,newQ,totalSale);
        } else {
            console.log("We ain't got the quantity you need!")
        }
    }

    function updateInventory(stockItemId,newQ,itemQ,totalSale){
        connection.query(`UPDATE products SET stock_quantity = ${newQ} WHERE item_id = ${stockItemId}`, function (err,result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        })
        connection.query(`SELECT * FROM products WHERE item_id = ${stockItemId}`, function(err,newLoad){
            if (err) throw err;
            console.log(`The new quantity for ${newLoad[0].product_name} is ${newLoad[0].stock_quantity} units`);
            connection.end();
        })
    }
};