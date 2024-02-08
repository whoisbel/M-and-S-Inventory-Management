/*
  Warnings:

  - You are about to drop the column `log_id` on the `stock` table. All the data in the column will be lost.
  - Added the required column `area_id` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_log_id_fkey`;

-- AlterTable
ALTER TABLE `inventory` MODIFY `is_washed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `log_id`,
    ADD COLUMN `area_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `Area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
