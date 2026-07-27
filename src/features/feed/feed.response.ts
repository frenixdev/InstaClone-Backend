import { Request, Response } from 'express';

export const getFeed = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Feed fetched successfully!',
    success: true,
    data: req.result,
  });
};
export const getUserPosts = async (req: Request, res: Response)=>{
  return res.status(200).json({
    message: "user posts fetched successfully",
    success: true,
    data: req.result
  })
}
