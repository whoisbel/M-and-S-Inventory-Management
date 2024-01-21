/*
  Warnings:

  - Added the required column `isWashed` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventory` ADD COLUMN `isWashed` BOOLEAN NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;
