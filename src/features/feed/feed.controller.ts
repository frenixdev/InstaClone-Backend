import { Request, Response, NextFunction } from 'express';
import { LikeModel, PostModel } from 'models';

export const getFeedController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feed = await PostModel.find().populate('author').sort({createdAt: -1})
    const likes = await LikeModel.find({ user: req.user });
    // const follows = await
    const likedPostIds = likes.map((doc) => doc.postId);
    req.result = { feed, liked: likedPostIds };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
