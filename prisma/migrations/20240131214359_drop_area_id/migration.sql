/*
  Warnings:

  - You are about to drop the column `areaId` on the `stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_areaId_fkey`;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `areaId`;
