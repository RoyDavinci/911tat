/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `description` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `description` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_descriptionId_fkey`;

-- AlterTable
ALTER TABLE `description` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `description_userId_key` ON `description`(`userId`);

-- AddForeignKey
ALTER TABLE `description` ADD CONSTRAINT `description_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
