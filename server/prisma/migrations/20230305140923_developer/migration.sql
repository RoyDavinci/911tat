/*
  Warnings:

  - You are about to drop the column `channel` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `amount` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `channel`,
    DROP COLUMN `product_name`,
    DROP COLUMN `total_amount`,
    ADD COLUMN `amount` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NULL;
