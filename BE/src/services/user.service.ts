import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUserInput, UpdateUserInput } from 'validation/user.validation';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Các field được phép trả về (không bao gồm password)
const USER_SELECT = {
  id: true,
  email: true,
  role: true,
  name: true,
  code: true,
  phone: true,
  face_url: true,
  class: true,
} as const;

// Lấy tất cả user
const getAllUsers = async () => {
  return prisma.user.findMany({
    select: USER_SELECT,
    orderBy: { id: 'asc' },
  });
};

// Lấy 1 user theo id
const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: USER_SELECT,
  });
};

// Tạo user mới
const createUser = async (data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
      name: data.name,
      code: data.code,
      phone: data.phone,
      face_url: data.face_url,
      class: data.class,
    },
    select: USER_SELECT,
  });
};

// Cập nhật user
const updateUser = async (id: number, data: UpdateUserInput) => {
  return prisma.user.update({
    where: { id },
    data,
    select: USER_SELECT,
  });
};

// Xoá user
const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};

export const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
