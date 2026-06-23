import { Router } from 'express';
import { verifyTokenHandler } from 'middlewares';
import * as comment from './comment.controller';
import * as response from './comment.response.middleware';
const commentRoutes = Router();

commentRoutes.post(
  '/newComment',
  verifyTokenHandler,
  comment.createCommentController,
  response.sendCommentCreatedRes
);

commentRoutes.get(
  '/:postId',
  verifyTokenHandler,
  comment.getCommentsController,
  response.sendGetCommentsRes
);
commentRoutes.delete(
  '/:commentId',
  verifyTokenHandler,
  comment.deleteCommentController,
  response.sendDeleteCommentRes
);

export { commentRoutes };
