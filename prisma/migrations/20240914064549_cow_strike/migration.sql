-- CreateTable
CREATE TABLE `Cow` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `ageMonths` INTEGER NOT NULL,
    `milkCount` INTEGER NOT NULL DEFAULT 0,
    `isBSOD` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Cow_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MilkProduction` (
    `id` VARCHAR(191) NOT NULL,
    `cowId` VARCHAR(191) NOT NULL,
    `milkType` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
