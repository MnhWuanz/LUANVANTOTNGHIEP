import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Password phải có ít nhất 6 ký tự'),
  phone: z.string().max(20).optional(),
  role: z.enum(['admin', 'teacher'], {
    errorMap: () => ({ message: 'Role phải là admin hoặc teacher' }),
  }),
});

export const updateUserSchema = z.object({
  email: z.string().email('Email không hợp lệ').optional(),
  phone: z.string().max(20).optional(),
  role: z.enum(['admin', 'teacher']).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
