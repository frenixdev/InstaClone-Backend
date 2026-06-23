import { Request, Response, NextFunction } from 'express';
import { imageKit } from 'config';
import { PostModel } from 'models';
import { AppError } from 'utils/AppError';

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const caption = req.body.caption || '';
  const img = req.file;
  const user = req.user;
  if (!img) throw new AppError('invalid or unavailable image', 400);

  try {
    const imageKitRes = await imageKit.files.upload({
      file: img.buffer.toString('base64'),
      fileName: img.originalname,
      folder: '/posts',
    });
    if (!imageKitRes) throw new AppError('unable to upload image', 400);
    console.log({ imageKitRes });
    const post = await PostModel.create({
      caption,
      imageUrl: imageKitRes.url,
      thumbnailUrl: imageKitRes.thumbnailUrl,
      author: user,
    });
    if (!post) throw new AppError('Unable to create post', 400);
    req.result = post;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deletePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const postId = req.params.postId;
  if (!postId) throw new AppError('provide a post id in params', 400);
  try {
    const postRes = await PostModel.findOneAndDelete({
      $and: [{ author: user }, { _id: postId }],
    });
    if (!postRes) throw new AppError('unauthorized access', 400);
    req.result = postRes;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  try {
    const posts = await PostModel.find({ author: user }).lean();
    if (!posts) throw new AppError("can't find any post", 404);
    req.result = posts;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
