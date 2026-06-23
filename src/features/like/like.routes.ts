import { Router } from 'express';
import { verifyTokenHandler } from 'middlewares';
import * as like from './like.controller';
import * as response from './like.response.middleware';
const likeRoutes = Router();

likeRoutes.post(
  '/post/:postId',
  verifyTokenHandler,
  like.toggelLikeController,
  response.sendLikePostResponse
);

export { likeRoutes };
