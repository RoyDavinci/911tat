/*
  Warnings:

  - A unique constraint covering the columns `[escort_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[client_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `client_id` INTEGER NULL,
    ADD COLUMN `escort_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_escort_id_key` ON `users`(`escort_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_client_id_key` ON `users`(`client_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_escort_id_fkey` FOREIGN KEY (`escort_id`) REFERENCES `escorts`(`escort_id`) ON DELETE SET NULL ON UPDATE CASCADE;
