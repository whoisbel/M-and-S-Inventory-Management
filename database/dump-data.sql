INSERT INTO Area (description) VALUES ('Area 1'), ('Area 2'), ('Area 3'), ('Area 4'), ('Area 5'), ('Area 6'), ('Area 7'), ('Area 8'), ('Area 9'), ('Area 10');

INSERT INTO Grade (description, price) VALUES ('A', 90), ('B', 80), ('C', 70), ('D', 60), ('Ungraded', 0);


INSERT INTO Personnel (first_name, last_name, middle_name, username, role,  password, hasAccess)
VALUES
    ('Admin J', 'admin', '', 'admin', 1, 'admin', TRUE),
    ('Employee J', 'emp', '', 'employee', 2, 'employee', TRUE);

INSERT INTO Customer (first_name, last_name, email, mobile, isDeleted)
VALUES
    ('Juan', 'Dela Cruz', 'juan.delacruz@example.com', '+639171234567', FALSE),
    ('Maria', 'Santos', 'maria.santos@example.com', '+639281234567', FALSE),
    ('Jose', 'Reyes', 'jose.reyes@example.com', '+639351234567', FALSE),
    ('Sofia', 'Lim', 'sofia.lim@example.com', '+639461234567', FALSE),
    ('Miguel', 'Cruz', 'miguel.cruz@example.com', '+639571234567', FALSE),
    ('Isabella', 'Gonzales', 'isabella.gonzales@example.com', '+639681234567', FALSE),
    ('Andres', 'Ramos', 'andres.ramos@example.com', '+639791234567', FALSE),
    ('Julia', 'Perez', 'julia.perez@example.com', '+639801234567', FALSE),
    ('Diego', 'Tan', 'diego.tan@example.com', '+639911234567', FALSE),
    ('Angela', 'Garcia', 'angela.garcia@example.com', '+639221234567', FALSE);

INSERT INTO HarvestLog (area_id, quantity, harvestDate, isDeleted)
VALUES
    (1, 100, '2024-01-15 10:00:00', FALSE),
    (2, 150, '2024-01-16 11:30:00', FALSE),
    (3, 120, '2024-01-17 09:45:00', FALSE),
    (4, 200, '2024-01-18 14:20:00', FALSE),
    (5, 180, '2024-01-19 08:00:00', FALSE);


INSERT INTO Inventory (batch_id, stock_id, grade_id, isOutOfStock, isWashed, quantity, isDeleted)
VALUES
    (1, 1, 1, FALSE, TRUE, 80, FALSE),
    (1, 1, 2, FALSE, TRUE, 20, FALSE),
    (2, 2, 1, FALSE, FALSE, 100, FALSE),
    (2, 2, 2, FALSE, FALSE, 50, FALSE),
    (3, 3, 3, TRUE, TRUE, 80, FALSE),
    (3, 3, 5, TRUE, FALSE, 20, FALSE),
    (4, 4, 5, FALSE, FALSE, 200, FALSE),
    (5, 5, 5, FALSE, FALSE, 180, FALSE);

INSERT INTO Stock (area_id, grade_id, QuantityOnHand, isDeleted)
VALUES
    (1, 1, 80, FALSE),
    (1, 2, 20, FALSE),
    (1, 3, 0, FALSE),
    (1, 4, 0, FALSE),
    (1, 5, 0, FALSE),
    (2, 1, 100, FALSE),
    (2, 2, 50, FALSE),
    (2, 3, 0, FALSE),
    (2, 4, 0, FALSE),
    (2, 5, 0, FALSE),
    (3, 1, 0, FALSE),
    (3, 2, 0, FALSE),
    (3, 3, 0, FALSE),
    (3, 4, 0, FALSE),
    (3, 5, 0, FALSE),
    (4, 1, 0, FALSE),
    (4, 2, 0, FALSE),
    (4, 3, 0, FALSE),
    (4, 4, 0, FALSE),
    (4, 5, 200, FALSE),
    (5, 1, 0, FALSE),
    (5, 2, 0, FALSE),
    (5, 3, 0, FALSE),
    (5, 4, 0, FALSE),
    (5, 5, 180, FALSE);


INSERT INTO Stockout (stock_id, quantity, DateOut, type_id, isDeleted)
VALUES
    (13, 80, '2024-01-20 13:30:00', 1, FALSE),
    (15, 20, '2024-01-21 12:15:00', 2, FALSE);

INSERT INTO Order (customer_id, isPreOrder, orderDate, orderTotal, isFulfilled, isDeleted)
VALUES
    (1, FALSE, '2024-01-25 15:00:00', 4500, FALSE),
    (2, TRUE, '2024-01-26 09:30:00', 4000, FALSE),
    (3, FALSE, '2024-01-27 14:20:00', 4500, FALSE),
    (4, TRUE, '2024-01-28 11:45:00', 4500, FALSE),
    (5, FALSE, '2024-01-29 10:00:00', 3500, FALSE);

INSERT INTO OrderDetails (order_id, stock_id, isFulfilled, orderQuantity, orderTotal, LOADING_SCHEDULE, status_id, isDeleted)
VALUES
    (1, 1, FALSE, 50, 4500, '2024-02-01', 1, FALSE),
    (2, 2, FALSE, 50, 4000, '2024-02-02', 1, FALSE),
    (1, 3, FALSE, 50, 4500, '2024-02-03', 1, FALSE),
    (1, 4, FALSE, 50, 4500, '2024-02-04', 1, FALSE),
    (3, 5, FALSE, 50, 3500, '2024-02-05', 1, FALSE);