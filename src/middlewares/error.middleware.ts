import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

export const errorHandler: ErrorRequestHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      status: err.status,
      name: err.name,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
