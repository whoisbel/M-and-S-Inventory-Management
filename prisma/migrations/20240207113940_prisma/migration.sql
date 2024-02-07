/*
  Warnings:

  - You are about to drop the column `name` on the `customer` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_name` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `name`,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `middle_name` VARCHAR(191) NOT NULL;
