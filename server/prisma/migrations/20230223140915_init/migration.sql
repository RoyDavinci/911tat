-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` INTEGER NULL,
    `password` VARCHAR(200) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `subscription_id` INTEGER NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `users_subscription_id_key`(`subscription_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escorts` (
    `escort_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(200) NOT NULL,
    `username` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`escort_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(200) NOT NULL,
    `username` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribtions` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `months` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscribtions`(`subscription_id`) ON DELETE SET NULL ON UPDATE CASCADE;
