/*
  Warnings:

  - The primary key for the `personnel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `actionlog` DROP FOREIGN KEY `ActionLog_personnel_id_fkey`;

-- AlterTable
ALTER TABLE `actionlog` MODIFY `personnel_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `personnel` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `ActionLog` ADD CONSTRAINT `ActionLog_personnel_id_fkey` FOREIGN KEY (`personnel_id`) REFERENCES `Personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
