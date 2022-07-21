-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(191) NOT NULL,
    `name` LONGTEXT NOT NULL,
    `details` JSON NULL,
    `brand` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `images` JSON NULL,
    `features` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
