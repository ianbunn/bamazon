USE bamazon;

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES 
("Beats Solo 3","Electronics",199.99,25),
("MacBookPro 2015", "Electronics", 1599.99, 10),
("Die!Die!Die! Comic Book #1", "Books", 4.99, 250),
("Batman: Damned Comic Book #2", "Books", 7.99, 125),
("Gunnar Gaming Glasses", "Eyewear", 74.99, 20),
("Spectacles", "Eyewear", 169.99, 10),
("Mini Sesh Gear Vape", "Novelty", 17.99, 20),
("Yoda OG", "Hollistic Medicine", 40.00, 100),
("Strawnana", "Hollistic Medicine", 40.00, 50),
("Mushroom Coffee", "Beverages", 12.99, 50);

UPDATE products SET product_sales = 0