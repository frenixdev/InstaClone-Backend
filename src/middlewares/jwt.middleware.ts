import jwt from 'jsonwebtoken';
import { env } from '@/config';
import type { Request, Response, NextFunction } from 'express';
import { BlackListModel } from '../models';
import { AppError } from '../utils/AppError';

export const verifyTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(400).json({
      success: false,
      message: 'no token provided!',
    });
  const isTokenBlackListed = await BlackListModel.findOne({ token });
  if (isTokenBlackListed) throw new AppError('invalid Token', 401);
  req.token = token
  const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
  if (!decoded)
    return res.status(401).json({
      success: false,
      message: 'unauthorized action',
    });
  req.user = decoded.id;
  next();
};
export const createTokenHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.result) throw new Error('Invalid user object');
  const userId = req.result._id;
  try {
    const token = jwt.sign(
      {
        id: userId,
      },
      env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );
    req.token = token;
    next();
  } catch (error) {
    console.log('Create token handler error: ', error);
    next(error);
  }
};
