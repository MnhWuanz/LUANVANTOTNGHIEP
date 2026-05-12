import { NextFunction, Request, Response } from 'express';
import { checkValidJWT } from './jwt.midleware';

// Middleware kiểm tra đã đăng nhập (JWT)
const isLogin = (req: Request, res: Response, next: NextFunction) => {
  checkValidJWT(req, res, next);
};

// Middleware kiểm tra quyền admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Không có quyền truy cập' });
  }
};

// Middleware kiểm tra quyền teacher
const isTeacher = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user?.role === 'teacher' || user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Không có quyền truy cập' });
  }
};

export { isLogin, isAdmin, isTeacher };
