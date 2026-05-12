import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không có token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

export { checkValidJWT };
