DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(90),
    department_name VARCHAR(90),
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100),
    overhead_costs DECIMAL(15,2),
    PRIMARY KEY(department_id)
);

ALTER TABLE products
ADD product_sales DECIMAL(15,2);