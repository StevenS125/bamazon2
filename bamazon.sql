CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
item_id int NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(8,2),
stock_quantity INT NOT NULL 

  );

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00001,
'Navitimer',
'Breitling',
5499.99,
5);


Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00002,
'Chronometer',
'Breitling',
7499.99,
3);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00003,
'DateJust',
'Rolex',
2999.97,
10);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00004,
'Presidential',
'Rolex',
14999.95,
5);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00005,
'Bold',
'Movado',
1199.95,
5);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00006,
'Museum',
'Movado',
149.95,
60);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00007,
'Carrera',
'Tag Heuer',
2499.95,
7);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00008,
'Calibre',
'Tag Heuer',
2299.95,
3);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00009,
'Traditional',
'Tissot',
1099.99,
2);

Insert Into products (item_id, product_name, department_name, price, stock_quantity) VALUES (
00010,
'Classic',
'Tissot',
14999.95,
3);





USE bamazon;
CREATE TABLE departments(
DepartmentId int AUTO_INCREMENT,
PRIMARY KEY(DepartmentId),
department_Name varchar(50) NOT NULL,
OverHeadCosts DECIMAL(11,2) NOT NULL,
TotalSales DECIMAL(20,2) NOT NULL);


INSERT INTO Departments (department_Name, OverHeadCosts, TotalSales) VALUES (
'Breitling',
25000,
0);

INSERT INTO Departments (department_Name, OverHeadCosts, TotalSales) VALUES (
'Rolex',
25000,
0);

INSERT INTO Departments (department_Name, OverHeadCosts, TotalSales) VALUES (
'Movado',
15000,
0);

INSERT INTO Departments (department_Name, OverHeadCosts, TotalSales) VALUES (
'Tag Heuer',
20000,
0);

INSERT INTO Departments (department_Name, OverHeadCosts, TotalSales) VALUES (
'Tissot',
10000,
0);
