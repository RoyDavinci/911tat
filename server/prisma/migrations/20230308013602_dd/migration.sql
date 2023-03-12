/*
  Warnings:

  - You are about to drop the column `client_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `escort_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `escorts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[descriptionId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_userId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_escort_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `client_id`,
    DROP COLUMN `escort_id`,
    ADD COLUMN `descriptionId` INTEGER NULL;

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `escorts`;

-- CreateTable
CREATE TABLE `description` (
    `escort_id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(50) NULL,
    `state` VARCHAR(50) NULL,
    `country` VARCHAR(50) NULL,
    `build` VARCHAR(20) NULL,
    `height` VARCHAR(20) NULL,
    `BustSize` VARCHAR(20) NULL,
    `orientation` VARCHAR(20) NULL,
    `anal` VARCHAR(20) NULL,
    `oralSex` VARCHAR(20) NULL,
    `condom` VARCHAR(20) NULL,
    `smoke` VARCHAR(10) NULL,
    `ethnicity` VARCHAR(10) NULL DEFAULT 'Black',
    `age` VARCHAR(5) NULL,
    `shortTimeRate` VARCHAR(10) NULL,
    `overNightRate` VARCHAR(10) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`escort_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_descriptionId_key` ON `users`(`descriptionId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_descriptionId_fkey` FOREIGN KEY (`descriptionId`) REFERENCES `description`(`escort_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
