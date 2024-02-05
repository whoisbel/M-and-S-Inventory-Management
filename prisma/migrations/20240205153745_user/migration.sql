/*
  Warnings:

  - You are about to alter the column `personnel_id` on the `actionlog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `batch_id` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the column `stockId` on the `stockout` table. All the data in the column will be lost.
  - You are about to drop the `personnel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `log_id` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `Stockout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `actionlog` DROP FOREIGN KEY `ActionLog_personnel_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `stockout` DROP FOREIGN KEY `Stockout_stockId_fkey`;

-- AlterTable
ALTER TABLE `actionlog` MODIFY `personnel_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `batch_id`,
    ADD COLUMN `log_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stockout` DROP COLUMN `stockId`,
    ADD COLUMN `stock_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `personnel`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `has_access` BOOLEAN NOT NULL DEFAULT false,
    `is_admin` BOOLEAN NOT NULL,
    `date_created` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_log_id_fkey` FOREIGN KEY (`log_id`) REFERENCES `HarvestLog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stockout` ADD CONSTRAINT `Stockout_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActionLog` ADD CONSTRAINT `ActionLog_personnel_id_fkey` FOREIGN KEY (`personnel_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
