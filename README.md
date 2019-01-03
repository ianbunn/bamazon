# bamazon

bamazon is a `node.js` and `mysql` CLI app

An Amazon-like storefront app for CLI using `node.js` and `mysql`. App takes in orders from customers, and depletes the stock from the store's inventory (`products` table).

App also tracks product sales across store's department and provides a summary of the highest-grossing departments in bamazon store.

## MySQL Database Schema

The `schema.sql` file contains the initial creation of the bamazon database and `products` table.

The `seeds.sql` file contains the mock-up data to start populating the `products` table.

## NPM dependencies

If you want to start a `package.json` file, run the following command and follow the prompts in the CLI:

```shell
npm init
```

The `package.json` file will save your project details along with development dependencies.

bamazon uses the following npm packages:

- `mysql`
- `inquirer`

To install `mysql` run the following command:

```shell
npm install mysql
```

To install `inquirer` run the following command:

```shell
npm install inquirer
```