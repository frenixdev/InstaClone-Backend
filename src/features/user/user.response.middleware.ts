import { Request, Response } from 'express';

export const profileImgChangeRes = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Updated profile image',
  });
};
export const profileImgDeleteRes = (req: Request, res: Response) => {
  res.status(204).send();
};

export const profileUpdateRes = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'updated details',
    data: req.result,
  });
};
