import { Request, Response, NextFunction } from 'express';
import { LikeModel, PostModel } from 'models';

export const getFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const feed = await PostModel.find()
    .populate('author')
    .sort({ createdAt: -1 });
  const likes = await LikeModel.find({ user: req.user });
  const likedPostIds = likes.map((doc) => doc.postId);
  req.result = { feed, liked: likedPostIds };
  next();
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.result = await PostModel.find({ author: req.user }).sort({
    createdAt: -1,
  });

  next();
};
