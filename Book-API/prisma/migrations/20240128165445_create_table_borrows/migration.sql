-- CreateTable
CREATE TABLE `borrows` (
    `code` VARCHAR(100) NOT NULL,
    `code_member` VARCHAR(100) NOT NULL,
    `code_book` VARCHAR(100) NOT NULL,
    `time_borrow` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time_return` DATETIME NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `borrows` ADD CONSTRAINT `borrows_code_member_fkey` FOREIGN KEY (`code_member`) REFERENCES `members`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrows` ADD CONSTRAINT `borrows_code_book_fkey` FOREIGN KEY (`code_book`) REFERENCES `books`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
