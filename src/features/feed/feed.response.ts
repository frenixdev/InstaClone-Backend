import { Request, Response } from 'express';

export const getFeedResponse = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Feed fetched successfully!',
    success: true,
    data: req.result,
  });
};
