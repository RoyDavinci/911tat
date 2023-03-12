-- AlterTable
ALTER TABLE `admin` MODIFY `role` ENUM('Super_Admin', 'Admin', 'Escort') NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('Super_Admin', 'Admin', 'Escort') NOT NULL DEFAULT 'Escort';
