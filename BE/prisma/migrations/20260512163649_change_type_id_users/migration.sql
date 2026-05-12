/*
  Warnings:

  - The primary key for the `teachings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_user` on the `teachings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `teachings` DROP FOREIGN KEY `teachings_id_user_fkey`;

-- AlterTable
ALTER TABLE `teachings` DROP PRIMARY KEY,
    MODIFY `id_user` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_course`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id_username` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_username`);

-- AddForeignKey
ALTER TABLE `teachings` ADD CONSTRAINT `teachings_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_username`) ON DELETE RESTRICT ON UPDATE CASCADE;
