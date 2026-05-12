import { Request, Response } from 'express';
import 'dotenv/config';
import { loginService } from 'services/auth.service';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Vui lòng nhập email và mật khẩu',
      });
    }
    const result = await loginService(email, password);
    if (!result) {
      return res.status(401).json({
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    // Set http-only cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    // Respond with user data and token
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi server khi đăng nhập',
    });
  }
};
// @route POST /api/auth/logout
const logout = (req: Request, res: Response) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    // Respond with success message
    res.json({
      message: 'Đăng xuất thành công',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      message: 'Lỗi server khi đăng xuất',
    });
  }
};
// @desc Get current logged-in user
// @route GET /api/auth/me
const getMe = (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({
      message: 'Không có phiên đăng nhập',
    });
  }
  res.json(user);
};
export const LoginController = {
  login,
  logout,
  getMe,
};
