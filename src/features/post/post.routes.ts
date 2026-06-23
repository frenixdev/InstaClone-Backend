import { Router } from 'express';
import { upload } from 'config';
import { verifyTokenHandler } from 'middlewares';
import * as post from './post.controller';
import * as response from './post.response.middleware';

const postRoutes = Router();

postRoutes.get(
  '/',
  verifyTokenHandler,
  post.getPostController,
  response.sendGetPostResponse
);

/***
 * @route  [protected] Post /api/post
 * @desc
 * @reqBody
 * {
 *  image-file : imgFile;
 *  caption: string (optional)
 * }
 */

postRoutes.post(
  '/',
  upload.single('image-file'),
  verifyTokenHandler,
  post.createPostController,
  response.sendCreatePostResponse
);

postRoutes.delete(
  '/:postId',
  verifyTokenHandler,
  post.deletePostController,
  response.sendDeletePostResponse
);



export { postRoutes };
