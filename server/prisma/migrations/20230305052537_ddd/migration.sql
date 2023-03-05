/*
  Warnings:

  - You are about to drop the column `imageId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_imageId_fkey`;

-- AlterTable
ALTER TABLE `Images` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `imageId`;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
