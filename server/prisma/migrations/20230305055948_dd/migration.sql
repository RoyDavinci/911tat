-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `escorts`(`escort_id`) ON DELETE SET NULL ON UPDATE CASCADE;
