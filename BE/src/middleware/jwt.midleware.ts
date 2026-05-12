import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: 'Không có token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

export { checkValidJWT };
