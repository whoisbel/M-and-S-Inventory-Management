

DELIMITER //



CREATE TRIGGER before_inventory_insert
BEFORE INSERT ON Inventory
FOR EACH ROW
BEGIN
  DECLARE inserted_grade_id INT;

  DECLARE inserted_quantity DECIMAL;
  DECLARE matching_stock_id INT;
  DECLARE updated_quantity DECIMAL;
  DECLARE ungraded_grade_id INT;
  SET inserted_grade_id = NEW.grade_id;
  
  SET inserted_quantity = NEW.quantity;
  SELECT id 
  INTO ungraded_grade_id
  FROM grade
  WHERE
  description = "Ungraded";




  SELECT id, quantity_on_hand
  INTO matching_stock_id, updated_quantity
  FROM Stock
  WHERE grade_id = inserted_grade_id  AND is_washed = NEW.is_washed;

  
  IF matching_stock_id IS NULL AND inserted_grade_id != ungraded_grade_id THEN
 
    INSERT INTO Stock (grade_id, quantity_on_hand, is_washed)
    VALUES (inserted_grade_id, inserted_quantity, NEW.is_washed);
    SET matching_stock_id = LAST_INSERT_ID();
  ELSE
    UPDATE Stock
    SET quantity_on_hand = quantity_on_hand + inserted_quantity
    WHERE stock.id = matching_stock_id;
  END IF;

  SET NEW.stock_id = matching_stock_id;
 


END;

//

CREATE TRIGGER before_order_details_insert
BEFORE INSERT ON orderdetail
FOR EACH ROW
BEGIN
  
  DECLARE inserted_quantity DECIMAL;

  SET inserted_quantity = NEW.order_quantity;

  UPDATE Stock
  SET quantity_on_hand = quantity_on_hand - inserted_quantity
  WHERE stock.id = NEW.stock_id;

END;

//
DELIMITER ;