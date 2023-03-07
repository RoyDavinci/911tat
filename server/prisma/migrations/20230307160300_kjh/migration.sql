-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `profilePhoto` VARCHAR(191) NULL DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    `password` VARCHAR(200) NOT NULL,
    `accountStatus` INTEGER NOT NULL DEFAULT 1234567890,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `escort_id` INTEGER NULL,
    `client_id` INTEGER NULL,
    `subscription_id` INTEGER NULL,
    `adminId` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_escort_id_key`(`escort_id`),
    UNIQUE INDEX `users_client_id_key`(`client_id`),
    UNIQUE INDEX `users_subscription_id_key`(`subscription_id`),
    UNIQUE INDEX `users_adminId_key`(`adminId`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escorts` (
    `escort_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(200) NOT NULL,
    `username` VARCHAR(200) NOT NULL,
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

    UNIQUE INDEX `escorts_email_key`(`email`),
    PRIMARY KEY (`escort_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(200) NOT NULL,
    `username` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `client_email_key`(`email`),
    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribtions` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `months` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('Super_Admin', 'Admin') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Images` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `images` VARCHAR(200) NULL,
    `profileImage` VARCHAR(100) NULL DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `transactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_status` ENUM('pending', 'successful', 'failed') NOT NULL DEFAULT 'pending',
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `payment_type` VARCHAR(191) NOT NULL,
    `biller_Reference` VARCHAR(191) NOT NULL,
    `transaction_reference` VARCHAR(50) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscribtions`(`subscription_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_escort_id_fkey` FOREIGN KEY (`escort_id`) REFERENCES `escorts`(`escort_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `escorts`(`escort_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
