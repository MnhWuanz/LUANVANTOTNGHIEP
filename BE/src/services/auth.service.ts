import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from 'config/client';

const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      message: 'Email hoặc mật khẩu không chính xác',
    };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      message: 'Email hoặc mật khẩu không chính xác',
    };
  }
  const token = jwt.sign(
    {
      id_username: user.id_username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h',
    },
  );
  return {
    id_username: user.id_username,
    email: user.email,
    role: user.role,
    token,
  };
};
export { loginService };
