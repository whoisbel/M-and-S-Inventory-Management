-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_log_id_fkey`;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_log_id_fkey` FOREIGN KEY (`log_id`) REFERENCES `HarvestLog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
