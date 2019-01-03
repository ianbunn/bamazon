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
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    afterConnection();
});

function afterConnection(){
    connection.query("SELECT item_id,product_name,price FROM products", function(err,res){
        if(err) throw err;
        var products = res
        connection.end();
    });
};