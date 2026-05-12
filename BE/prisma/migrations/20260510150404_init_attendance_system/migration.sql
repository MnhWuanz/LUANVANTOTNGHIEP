-- CreateTable
CREATE TABLE `users` (
    `id_username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `role` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id_username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id_course` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,

    UNIQUE INDEX `courses_code_key`(`code`),
    PRIMARY KEY (`id_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id_session` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `courseId` INTEGER NOT NULL,

    PRIMARY KEY (`id_session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachings` (
    `id_user` VARCHAR(191) NOT NULL,
    `id_course` INTEGER NOT NULL,

    PRIMARY KEY (`id_user`, `id_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id_student` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `class` VARCHAR(100) NOT NULL,
    `face_url` VARCHAR(500) NULL,

    UNIQUE INDEX `students_code_key`(`code`),
    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id_student`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollments` (
    `id_enrollment` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(50) NOT NULL,
    `studentId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,

    UNIQUE INDEX `enrollments_studentId_courseId_key`(`studentId`, `courseId`),
    PRIMARY KEY (`id_enrollment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendances` (
    `id_attendance` INTEGER NOT NULL AUTO_INCREMENT,
    `check_in_time` TIME NULL,
    `status` VARCHAR(50) NOT NULL,
    `sessionId` INTEGER NOT NULL,
    `enrollmentId` INTEGER NOT NULL,

    UNIQUE INDEX `attendances_sessionId_enrollmentId_key`(`sessionId`, `enrollmentId`),
    PRIMARY KEY (`id_attendance`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachings` ADD CONSTRAINT `teachings_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachings` ADD CONSTRAINT `teachings_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `courses`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id_student`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id_session`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `enrollments`(`id_enrollment`) ON DELETE RESTRICT ON UPDATE CASCADE;
