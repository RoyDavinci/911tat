-- CreateTable
CREATE TABLE `transactions` (
    `transactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_status` ENUM('pending', 'successful', 'failed') NOT NULL DEFAULT 'pending',
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `total_amount` VARCHAR(191) NOT NULL,
    `payment_type` VARCHAR(191) NOT NULL,
    `biller_Reference` VARCHAR(191) NOT NULL,
    `transaction_reference` VARCHAR(50) NOT NULL,
    `channel` VARCHAR(191) NULL,
    `product_name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
