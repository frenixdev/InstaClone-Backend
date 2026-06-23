import { Request, Response } from 'express';

export const sendCommentCreatedRes = async (req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    message: 'commnt created successfully',
    data: req.result,
  });
};

export const sendGetCommentsRes = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'comment fetched successfully',
    data: req.result,
  });
};

export const sendDeleteCommentRes = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Comment deleted successfully',
    data: req.result,
  });
};
