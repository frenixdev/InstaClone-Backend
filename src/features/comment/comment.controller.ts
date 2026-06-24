import { Request, Response, NextFunction } from 'express';
import { AppError } from 'utils/AppError';
import { CommentModel, PostModel } from 'models';

interface ReqBody {
  postId: string;
  text: string;
}
export const createCommentController = async (
  req: Request<{}, {}, ReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { postId, text } = req.body;
  const user = req.user;
  if (!postId || !text) throw new AppError('invalid comment', 400);
  try {
    const comment = await CommentModel.create({
      postId,
      user,
      text,
    });
    if (!comment) throw new AppError('unable to create comment', 400);
    await PostModel.findByIdAndUpdate(postId, {
      $inc: { commentCount: +1 },
    });
    req.result = comment;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getCommentsController = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const user = req.user;
  if (!postId) throw new AppError('provide a post id', 400);
  try {
    let userComments;
    try {
      userComments = await CommentModel.find({
        postId,
        user,
      }).lean();
    } catch (err) {
      console.log('failed to get user comments');
    }
    const comments = await CommentModel.find({
      postId,
    }).lean();
    if (userComments) {
      req.result = [...userComments, ...comments];
    } else {
      req.result = comments;
    }

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deleteCommentController = async (
  req: Request<{}, {}, { commentId: string; postId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { commentId, postId } = req.body;
  const user = req.user;
  try {
    const deleteResult = await CommentModel.deleteOne({
      _id: commentId,
      postId,
      user,
    });
    if (deleteResult.deletedCount === 1) {
      ((req.result = { deleted: true }), next());
    }
    const post = await PostModel.findById(postId);
    if (!post || post.author.toString() !== user)
      throw new AppError('unauthorized access ', 403);
    const authorDelete = await CommentModel.findByIdAndDelete(commentId);
    if (!authorDelete) throw new AppError('comment not found ', 404);
    req.result = authorDelete;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
