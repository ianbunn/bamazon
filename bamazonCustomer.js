var mysql = require("mysql");
var inquirer = require("inquirer");

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
        console.log(`----------- Welcome to bamazon! -------------------`)
        console.log(`----------- Take a look at our inventory ----------`)
        for (v in products) {
            console.log(products[v].item_id, products[v].product_name, products[v].price);
        }
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
                            var itemId = itemDetails.itemId - 1;
                            var itemQ = itemDetails.itemQuantity;
                            
                            checkInventory(itemId,itemQ);
                            updateInventory(itemId,itemQ)
                        })
                }
                else {
                    console.log("Thank you for visiting bamazon! Come back soon!")
                }
            });
    }

    function checkInventory (itemId,itemQ){
        if (itemId in products && itemQ <= products[itemId].stock_quantity) {
            var total = products[itemId].price * itemQ;
            var quantity =- itemQ
            console.log(`Your total is $${total}. Put that cash in my hand!`)
            updateInventory(itemId,quantity);
        } else {
            console.log("We ain't got what you need!")
        }
    }

    function updateInventory (itemId,quantity){
        connection.query(`UPDATE products SET stock_quantity = ${quantity} WHERE item_id = ${itemId}`, function (err, res) {
            if (err) throw err;
            console.log(res);
        })
    }
};
