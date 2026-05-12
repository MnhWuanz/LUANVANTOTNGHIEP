import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUserInput, UpdateUserInput } from 'validation/user.validation';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Lấy tất cả user (không trả về password)
const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id_username: true,
      email: true,
      phone: true,
      role: true,
    },
    orderBy: { id_username: 'asc' },
  });
};

// Lấy 1 user theo id
const getUserById = async (id_username: number) => {
  return prisma.user.findUnique({
    where: { id_username },
    select: {
      id_username: true,
      email: true,
      phone: true,
      role: true,
    },
  });
};

// Tạo user mới (id_username tự động autoincrement)
const createUser = async (data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: data.role,
    },
    select: {
      id_username: true,
      email: true,
      phone: true,
      role: true,
    },
  });
};

// Cập nhật user
const updateUser = async (id_username: number, data: UpdateUserInput) => {
  return prisma.user.update({
    where: { id_username },
    data,
    select: {
      id_username: true,
      email: true,
      phone: true,
      role: true,
    },
  });
};

// Xoá user
const deleteUser = async (id_username: number) => {
  return prisma.user.delete({
    where: { id_username },
  });
};

export const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
