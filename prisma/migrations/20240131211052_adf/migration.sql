/*
  Warnings:

  - You are about to alter the column `quantity` on the `harvestlog` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `quantity` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `quantityOnHand` on the `stock` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `quantity` on the `stockout` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - Added the required column `batchId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `harvestlog` MODIFY `quantity` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `inventory` MODIFY `quantity` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `stock` ADD COLUMN `batchId` INTEGER NOT NULL,
    MODIFY `quantityOnHand` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `stockout` MODIFY `quantity` DECIMAL(65, 30) NOT NULL;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `HarvestLog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
