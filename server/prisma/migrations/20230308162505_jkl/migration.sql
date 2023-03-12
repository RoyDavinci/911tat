-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_userId_fkey`;

-- DropForeignKey
ALTER TABLE `description` DROP FOREIGN KEY `description_userId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_subscription_id_fkey`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscribtions`(`subscription_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `description` ADD CONSTRAINT `description_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
