DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


USE products; 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Heels", "Shoes", 10, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flats", "Shoes", 12, 52);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sneakers", "Shoes", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pots", "Kitchen", 40, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pans", "Kitchen", 30, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spoons", "Kitchen", 9, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Forks", "Kitchen", 15, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tops", "Clothes", 30, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-shirts", "Clothes", 15, 66);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothes", 30, 85);