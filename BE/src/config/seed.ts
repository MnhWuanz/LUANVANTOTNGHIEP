import 'dotenv/config';
import { prisma } from './client';
import bcrypt from 'bcrypt';

async function main() {
  const SALT_ROUNDS = 10;
  const adminPassword = await bcrypt.hash('123456', SALT_ROUNDS);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.edu.vn' },
    update: {},
    create: {
      email: 'admin@school.edu.vn',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  });

  const teacherPassword = await bcrypt.hash('123456', SALT_ROUNDS);

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@school.edu.vn' },
    update: {},
    create: {
      email: 'teacher@school.edu.vn',
      name: 'Teacher One',
      code: 'GV001',
      password: teacherPassword,
      role: 'teacher',
    },
  });

  console.log('Seeding completed:');
  console.log({ admin, teacher });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
