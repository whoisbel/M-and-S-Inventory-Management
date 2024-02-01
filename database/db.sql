CREATE DATABASE IF NOT EXISTS mns_inventory;

USE mns_inventory;

CREATE TABLE IF NOT EXISTS Codes(
    access_code INT PRIMARY KEY
)

CREATE TABLE IF NOT EXISTS Role(
    role_id INT PRIMARY KEY AUTOINCREMENT,
    description VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS Personnel (
    personnel_id INT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    role int NOT NULL,
    password VARCHAR(255) NOT NULL,
    hasAccess BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (role_id) REFERENCES Role (role_id)
    );

CREATE TABLE IF NOT EXISTS Area(
    area_id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Grade(
    grade_id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    price DOUBLE NULL,
);

CREATE TABLE IF NOT EXISTS stockout_type(
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Status(
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Customer(
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    mobile VARCHAR(255) NULL,
    isDeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS HarvestLog(
    batch_id INT PRIMARY KEY AUTO_INCREMENT,
    area_id INT NOT NULL,
    quantity DOUBLE NOT NULL,
    harvestDate DATETIME,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (area_id) REFERENCES Area(area_id)
);

CREATE TABLE IF NOT EXISTS Stock(
    stock_id INT PRIMARY KEY AUTO_INCREMENT,
    area_id INT NOT NULL,
    grade_id INT NOT NULL,
    QuantityOnHand DOUBLE NOT NULL,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (area_id) REFERENCES Area(area_id),
    FOREIGN KEY (grade_id) REFERENCES Grade(grade_id)
);

CREATE TABLE IF NOT EXISTS Inventory(
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    stock_id INT NOT NULL,
    grade_id INT NOT NULL,
    isOutOfStock BOOLEAN DEFAULT FALSE,
    isWashed BOOLEAN DEFAULT FALSE,
    quantity DOUBLE NOT NULL,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (batch_id) REFERENCES HarvestLog(batch_id),
    FOREIGN KEY (stock_id) REFERENCES Stock(stock_id),
    FOREIGN KEY (grade_id) REFERENCES Grade(grade_id)
);

CREATE TABLE IF NOT EXISTS Stockout(
    stockout_id INT PRIMARY KEY AUTO_INCREMENT,
    stock_id INT NOT NULL,
    quantity DOUBLE NOT NULL,
    DateOut DATETIME NOT NULL,
    type_id INT NOT NULL,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (stock_id) REFERENCES Stock(stock_id),
    FOREIGN KEY (type_id) REFERENCES stockout_type(type_id)
);

CREATE TABLE IF NOT EXISTS Order(
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    isPreOrder BOOLEAN DEFAULT FALSE,
    orderDate DATETIME NOT NULL,
    orderTotal DOUBLE NOT NULL,
    isFulfilled BOOLEAN DEFAULT FALSE,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE IF NOT EXISTS OrderDetails(
    orderDetail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    stock_id INT NOT NULL,
    isFulfilled BOOLEAN DEFAULT FALSE,
    orderQuantity DOUBLE NOT NULL,
    orderTotal DOUBLE NOT NULL,
    LOADING SCHEDULE DATE NULL,
    status_id INT NOT NULL,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (order_id) REFERENCES Order(order_id),
    FOREIGN KEY (stock_id) REFERENCES Stock(stock_id),
    FOREIGN KEY (status_id) REFERENCES Status(status_id)
);

INSERT INTO Codes VALUES (0123);
INSERT INTO Role (description) VALUES ('Admin', 'Employee');
INSERT INTO stockout_type (description) VALUES ('Ordered'), ('Disposed');
INSERT INTO Status (description) VALUES ('Processing'), ('Packed'), ('Scheduled for Loading'), ('Fulfilled');

