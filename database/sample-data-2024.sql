INSERT INTO orders (customer_id, is_preorder, order_date, order_total, is_fulfilled) VALUES
    (1, 1, '2024-03-09', ((5300*90)+(6500*80)+(5900*70)+(3800*45)+(4600*35)), 0),
    (2, 0, '2024-03-12', ((13900*90)+(11600*80)+(9600*70)+(2300*45)+(3400*35)), 0);

INSERT INTO orderdetail (order_id, stock_id, is_fulfilled, order_quantity, unit_price, sub_total, loading_schedule, status) VALUES
    (14, 3, 0, 5300, 90, (5300*90), '2024-03-19', 'processing'),
    (14, 4, 0, 6500, 80, (6500*80), '2024-03-19', 'processing'),
    (14, 5, 0, 5900, 70, (5900*70), '2024-03-19', 'processing'),
    (14, 6, 0, 3800, 45, (3800*45), '2024-03-19', 'processing'),
    (14, 7, 0, 4600, 35, (4600*35), '2024-03-19', 'processing'),

    (15, 3, 0, 13900, 90, (13900*90), '2024-03-19', 'processing'),
    (15, 4, 0, 11600, 80, (11600*80), '2024-03-19', 'processing'),
    (15, 5, 0, 9600, 70, (9600*70), '2024-03-19', 'processing'),
    (15, 6, 0, 2300, 45, (2300*45), '2024-03-19', 'processing'),
    (15, 7, 0, 3400, 35, (3400*35), '2024-03-19', 'processing');