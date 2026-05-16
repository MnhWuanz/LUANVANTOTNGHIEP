/*
  Warnings:

  - You are about to drop the column `studentId` on the `enrollments` table. All the data in the column will be lost.
  - The primary key for the `teachings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_course` on the `teachings` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `teachings` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,courseId]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `teachings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `teachings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `teachings` DROP FOREIGN KEY `teachings_id_course_fkey`;

-- DropForeignKey
ALTER TABLE `teachings` DROP FOREIGN KEY `teachings_id_user_fkey`;

-- DropIndex
DROP INDEX `enrollments_studentId_courseId_key` ON `enrollments`;

-- DropIndex
DROP INDEX `teachings_id_course_fkey` ON `teachings`;

-- AlterTable
ALTER TABLE `enrollments` DROP COLUMN `studentId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `teachings` DROP PRIMARY KEY,
    DROP COLUMN `id_course`,
    DROP COLUMN `id_user`,
    ADD COLUMN `courseId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `courseId`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id_username`,
    ADD COLUMN `class` VARCHAR(100) NULL,
    ADD COLUMN `code` VARCHAR(50) NULL,
    ADD COLUMN `face_url` VARCHAR(500) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `students`;

-- CreateIndex
CREATE UNIQUE INDEX `enrollments_userId_courseId_key` ON `enrollments`(`userId`, `courseId`);

-- CreateIndex
CREATE UNIQUE INDEX `users_code_key` ON `users`(`code`);

-- AddForeignKey
ALTER TABLE `teachings` ADD CONSTRAINT `teachings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachings` ADD CONSTRAINT `teachings_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
