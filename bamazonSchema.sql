DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

-- bamazon inventory --
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

-- create data --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('KitchenAid','Small Appliances',219.00,45),
    ('Pet Kennel Cooling Mat','Furniture',38.39,62),
    ('Bluetooth Headphones','Electronics',19.98,18),
    ('Echo Dot','Electronics',29.99,30),
    ('Aviator Sunglasses','Accessories',13.08,97),
    ('Headband','Clothing',5.35,82),
    ('Uber Dual Dash Cam','Electronics',135.99,47),
    ('Slip On Water Shoes','Clothing',22.09,22),
    ('Cube Closet Storage Shelves','Furniture',15.16,100),
    ('Dyson Ball Upright Vacuum','Home Care',199.99,36);