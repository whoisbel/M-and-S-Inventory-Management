INSERT INTO Area (description) VALUES ('Area 1'), ('Area 2'), ('Area 3'), ('Area 4'), ('Area 5'), ('Area 6'), ('Area 7'), ('Area 8'), ('Area 9'), ('Area 10');

INSERT INTO Grade (description, price) VALUES ('A', 90), ('B', 80), ('C', 70), ('D', 60), ('Ungraded');

INSERT INTO Users (user_id, password)
VALUES
    ('AAD1234', 'securepassword1'),
    ('BBC5678', 'strongpass789'),
    ('CCC9101', 'safeandstrong23'),
    ('DDD1122', 'password4321'),
    ('EEE3344', 'myp@ssword567');

INSERT INTO Customer (first_name, last_name, email, mobile)
VALUES
    ('Juan', 'Dela Cruz', 'juan.delacruz@example.com', '+639171234567'),
    ('Maria', 'Santos', 'maria.santos@example.com', '+639281234567'),
    ('Jose', 'Reyes', 'jose.reyes@example.com', '+639351234567'),
    ('Sofia', 'Lim', 'sofia.lim@example.com', '+639461234567'),
    ('Miguel', 'Cruz', 'miguel.cruz@example.com', '+639571234567'),
    ('Isabella', 'Gonzales', 'isabella.gonzales@example.com', '+639681234567'),
    ('Andres', 'Ramos', 'andres.ramos@example.com', '+639791234567'),
    ('Julia', 'Perez', 'julia.perez@example.com', '+639801234567'),
    ('Diego', 'Tan', 'diego.tan@example.com', '+639911234567'),
    ('Angela', 'Garcia', 'angela.garcia@example.com', '+639221234567');

INSERT INTO HarvestLog (area_id, quantity, harvestDate)
VALUES
    (1, 100, '2024-01-15 10:00:00'),
    (2, 150, '2024-01-16 11:30:00'),
    (3, 120, '2024-01-17 09:45:00'),
    (4, 200, '2024-01-18 14:20:00'),
    (5, 180, '2024-01-19 08:00:00');

INSERT INTO Inventory (batch_id, stock_id, grade_id, isOutOfStock, isWashed, quantity)
VALUES
    (1, 1, 1, FALSE, TRUE, 80),
    (1, 1, 2, FALSE, TRUE, 20),
    (2, 2, 1, FALSE, FALSE, 100),
    (2, 2, 2, FALSE, FALSE, 50),
    (3, 3, 3, TRUE, TRUE, 80),
    (3, 3, 5, TRUE, FALSE, 20),
    (4, 4, 5, FALSE, FALSE, 200),
    (5, 5, 5, FALSE, FALSE, 180);

INSERT INTO Stock (area_id, grade_id, QuantityOnHand)
VALUES
    (1, 1, 80),
    (1, 2, 20),
    (1, 3, 0),
    (1, 4, 0),
    (1, 5, 0),
    (2, 1, 100),
    (2, 2, 50),
    (2, 3, 0),
    (2, 4, 0),
    (2, 5, 0),
    (3, 1, 0),
    (3, 2, 0),
    (3, 3, 0),
    (3, 4, 0),
    (3, 5, 0),
    (4, 1, 0),
    (4, 2, 0),
    (4, 3, 0),
    (4, 4, 0),
    (4, 5, 200),
    (5, 1, 0),
    (5, 2, 0),
    (5, 3, 0),
    (5, 4, 0),
    (5, 5, 180);


INSERT INTO Stockout (stock_id, quantity, DateOut, type_id)
VALUES
    (13, 80, '2024-01-20 13:30:00', 1),
    (15, 20, '2024-01-21 12:15:00', 2);

INSERT INTO Order (customer_id, isPreOrder, orderDate, orderTotal, isFulfilled)
VALUES
    (1, FALSE, '2024-01-25 15:00:00', 4500, FALSE),
    (2, TRUE, '2024-01-26 09:30:00', 4000, FALSE),
    (3, FALSE, '2024-01-27 14:20:00', 4500, FALSE),
    (4, TRUE, '2024-01-28 11:45:00', 4500, FALSE),
    (5, FALSE, '2024-01-29 10:00:00', 3500, FALSE);

INSERT INTO OrderDetails (order_id, stock_id, isFulfilled, orderQuantity, orderTotal, LOADING_SCHEDULE, status_id)
VALUES
    (1, 1, FALSE, 50, 4500, '2024-02-01', 1),
    (2, 2, FALSE, 50, 4000, '2024-02-02', 1),
    (1, 3, FALSE, 50, 4500, '2024-02-03', 1),
    (1, 4, FALSE, 50, 4500, '2024-02-04', 1),
    (3, 5, FALSE, 50, 3500, '2024-02-05', 1);