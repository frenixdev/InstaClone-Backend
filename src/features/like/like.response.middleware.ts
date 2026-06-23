import { Request, Response } from "express";

export const sendLikePostResponse = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    liked: req.isTrue,
  });
};
