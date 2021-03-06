# bamazon

bamazon is a `node.js` and `mysql` CLI app

An Amazon-like storefront app for CLI using `node.js` and `mysql`. App takes in orders from customers, and depletes the stock from the store's inventory (`products` table).

App also allows store manager to view all inventory, view low inventory, add more inventory, or add a whole new product!

## MySQL Database Schema

The `schema.sql` file contains the initial creation of the bamazon database and `products` table.

The `seeds.sql` file contains the mock-up data to start populating the `products` table.

## NPM dependencies

If you want to start a `package.json` file, run the following command and follow the prompts in the CLI:

```shell
npm init
```

The `package.json` file will save your project details along with development dependencies (npm packages).

bamazon uses the following npm packages:

- `mysql`
- `inquirer`
- `cli-table`

To install `mysql` run the following command:

```shell
npm install mysql
```

To install `inquirer` run the following command:

```shell
npm install inquirer
```

To install `cli-table` run the following command:

```shell
npm install cli-table
```

## Running bamazon! for Customers

To run bamazon! and start buying some dank products, run the following command in the command line interface:

```shell
node bamazonCustomer
```

This will trigger the following interaction:

![node bamazonCustoner](https://github.com/ianbunn/bamazon/blob/master/assets/images/bamazonCustomer.gif)

## Running bamazon! for Managers

To run bamazon! for manager functions, run the following command in the command line interface:

```shell
node bamazonManager
```

This will trigger the following interaction to view all the inventory, view ONLY LOW inventory, and add inventory:

![node bamazonManager](https://github.com/ianbunn/bamazon/blob/master/assets/images/bamazonManager.gif)

![node bamazonManager2](https://github.com/ianbunn/bamazon/blob/master/assets/images/bamazonManager2.gif)

![node bamazonManager3](https://github.com/ianbunn/bamazon/blob/master/assets/images/bamazonManager3.gif)