import { Response, Request } from 'express';

export const sendCreatePostResponse = (req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    message: 'post created successfully',
    data: req.result,
  });
};

export const sendDeletePostResponse = (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'post deleted successfully',
    data: req.result,
  });
};
export const sendGetPostResponse = (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'posts fetched successfully',
    data: req.result,
  });
};

