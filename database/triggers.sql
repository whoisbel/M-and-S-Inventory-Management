

DELIMITER //



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