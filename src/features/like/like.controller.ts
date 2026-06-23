import { NextFunction, Request, Response } from "express";
import { LikeModel, PostModel } from "models";

export const toggelLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const userId = req.user;
  try {
    // const post = await PostModel.findById(postId);
    const existingLIke = await LikeModel.findOne({
      postId,
      user: userId,
    }).lean();
    if (existingLIke) {
      await LikeModel.findByIdAndDelete(existingLIke._id);
      await PostModel.findByIdAndUpdate(postId, {
        $inc: { likeCount: -1 },
      });
      req.isTrue = false;
      next()
    } else {
       await LikeModel.create({
        postId: postId as string,
        user: userId,
      });
      await PostModel.findByIdAndUpdate(postId, {
        $inc: { likeCount: +1 },
      });
      req.isTrue = true;
      next()
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
