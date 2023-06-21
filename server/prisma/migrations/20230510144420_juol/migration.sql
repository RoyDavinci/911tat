-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `profilePhoto` VARCHAR(191) NULL DEFAULT '',
    `password` VARCHAR(200) NOT NULL,
    `accountStatus` INTEGER NOT NULL DEFAULT 1234567890,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `subscription_id` INTEGER NULL,
    `adminId` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `login_at` DATETIME(3) NULL,
    `descriptionId` INTEGER NULL,
    `role` ENUM('Super_Admin', 'Admin', 'Escort') NOT NULL DEFAULT 'Escort',
    `video` VARCHAR(200) NULL,
    `viewed` INTEGER NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `otp` VARCHAR(5) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_subscription_id_key`(`subscription_id`),
    UNIQUE INDEX `users_adminId_key`(`adminId`),
    UNIQUE INDEX `users_descriptionId_key`(`descriptionId`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `description` (
    `escort_id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(50) NULL DEFAULT '',
    `state` VARCHAR(50) NULL DEFAULT '',
    `country` VARCHAR(50) NULL DEFAULT '',
    `build` VARCHAR(20) NULL DEFAULT '',
    `height` VARCHAR(20) NULL DEFAULT '',
    `BustSize` VARCHAR(20) NULL DEFAULT '',
    `orientation` VARCHAR(20) NULL DEFAULT '',
    `anal` VARCHAR(20) NULL DEFAULT '',
    `oralSex` VARCHAR(20) NULL DEFAULT '',
    `condom` VARCHAR(20) NULL DEFAULT '',
    `smoke` VARCHAR(10) NULL DEFAULT '',
    `ethnicity` VARCHAR(10) NULL DEFAULT '',
    `age` VARCHAR(5) NULL DEFAULT '',
    `shortTimeRate` VARCHAR(10) NULL DEFAULT '',
    `overNightRate` VARCHAR(10) NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,
    `gender` VARCHAR(10) NULL DEFAULT '',
    `BDSM` VARCHAR(20) NULL DEFAULT '',
    `GFExperience` VARCHAR(20) NULL DEFAULT '',
    `sixtynine` VARCHAR(20) NULL DEFAULT '',
    `bj` VARCHAR(20) NULL DEFAULT '',
    `looks` VARCHAR(20) NULL DEFAULT '',
    `bio` VARCHAR(225) NULL DEFAULT '',
    `FrenchKiss` VARCHAR(5) NULL DEFAULT '',
    `analRimming` VARCHAR(5) NULL DEFAULT '',
    `attendingParties` VARCHAR(5) NULL DEFAULT '',
    `bdsmGiving` VARCHAR(5) NULL DEFAULT '',
    `beachParties` VARCHAR(5) NULL DEFAULT '',
    `beingFilmed` VARCHAR(5) NULL DEFAULT '',
    `bodyWorship` VARCHAR(5) NULL DEFAULT '',
    `cumInMoutn` VARCHAR(5) NULL DEFAULT '',
    `cumOnBody` VARCHAR(5) NULL DEFAULT '',
    `cumOnFace` VARCHAR(5) NULL DEFAULT '',
    `domesticCarer` VARCHAR(5) NULL DEFAULT '',
    `dominationGiving` VARCHAR(5) NULL DEFAULT '',
    `dominationRecieving` VARCHAR(5) NULL DEFAULT '',
    `doublePenetration` VARCHAR(5) NULL DEFAULT '',
    `eroticMassage` VARCHAR(5) NULL DEFAULT '',
    `faceSitting` VARCHAR(5) NULL DEFAULT '',
    `femaleStripper` VARCHAR(5) NULL DEFAULT '',
    `fetish` VARCHAR(5) NULL DEFAULT '',
    `foodplay` VARCHAR(5) NULL DEFAULT '',
    `handJob` VARCHAR(5) NULL DEFAULT '',
    `insemination` VARCHAR(5) NULL DEFAULT '',
    `lapDancing` VARCHAR(5) NULL DEFAULT '',
    `maleStripper` VARCHAR(5) NULL DEFAULT '',
    `massage` VARCHAR(5) NULL DEFAULT '',
    `modelling` VARCHAR(5) NULL DEFAULT '',
    `oralWithCondom` VARCHAR(5) NULL DEFAULT '',
    `outCallOverNight` VARCHAR(10) NULL DEFAULT '',
    `outCallShortTime` VARCHAR(10) NULL DEFAULT '',
    `outCallWeekend` VARCHAR(10) NULL DEFAULT '',
    `pegging` VARCHAR(5) NULL DEFAULT '',
    `periodPlay` VARCHAR(5) NULL DEFAULT '',
    `pregnant` VARCHAR(5) NULL DEFAULT '',
    `preparingMeal` VARCHAR(5) NULL DEFAULT '',
    `gangBang` VARCHAR(5) NULL DEFAULT '',
    `goldenShower` VARCHAR(5) NULL DEFAULT '',
    `humiliation` VARCHAR(5) NULL DEFAULT '',
    `oralWithoutCondom` VARCHAR(5) NULL DEFAULT '',
    `weekend` VARCHAR(10) NULL DEFAULT '',
    `currency` VARCHAR(10) NULL DEFAULT 'NGN',
    `displayName` VARCHAR(50) NULL,

    UNIQUE INDEX `description_userId_key`(`userId`),
    PRIMARY KEY (`escort_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribtions` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `subscription_Type` VARCHAR(100) NOT NULL,
    `subscription_Duration` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `subscribtions_user_id_key`(`user_id`),
    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('Super_Admin', 'Admin', 'Escort') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Images` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `images` VARCHAR(200) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Images_userId_fkey`(`userId`),
    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `review` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT 'Anonymous',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Reviews_userId_fkey`(`userId`),
    PRIMARY KEY (`reviewId`)
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

    INDEX `transactions_userId_fkey`(`userId`),
    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscribtions`(`subscription_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `description` ADD CONSTRAINT `description_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
