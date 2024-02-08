/*
  Warnings:

  - Added the required column `log_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventory` ADD COLUMN `log_id` INTEGER NOT NULL,
    ADD COLUMN `stock_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_log_id_fkey` FOREIGN KEY (`log_id`) REFERENCES `HarvestLog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
