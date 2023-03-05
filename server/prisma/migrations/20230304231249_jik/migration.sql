/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `escorts` ADD COLUMN `BustSize` VARCHAR(20) NULL,
    ADD COLUMN `age` VARCHAR(5) NULL,
    ADD COLUMN `anal` VARCHAR(20) NULL,
    ADD COLUMN `build` VARCHAR(20) NULL,
    ADD COLUMN `city` VARCHAR(50) NULL,
    ADD COLUMN `condom` VARCHAR(20) NULL,
    ADD COLUMN `country` VARCHAR(50) NULL,
    ADD COLUMN `ethnicity` VARCHAR(10) NULL DEFAULT 'Black',
    ADD COLUMN `height` VARCHAR(20) NULL,
    ADD COLUMN `oralSex` VARCHAR(20) NULL,
    ADD COLUMN `orientation` VARCHAR(20) NULL,
    ADD COLUMN `overNightRate` VARCHAR(10) NULL,
    ADD COLUMN `shortTimeRate` VARCHAR(10) NULL,
    ADD COLUMN `smoke` VARCHAR(10) NULL,
    ADD COLUMN `state` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `imageId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Images` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `images` VARCHAR(200) NULL,
    `profileImage` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_imageId_key` ON `users`(`imageId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Images`(`imageId`) ON DELETE SET NULL ON UPDATE CASCADE;
