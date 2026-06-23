import { Router } from 'express';
import { verifyTokenHandler } from 'middlewares';
import * as user from './user.controller';
import * as res from './user.response.middleware';
import { upload } from 'config';
const userRoutes = Router();

userRoutes.post(
  '/pfp',
  upload.single('image-file'),
  verifyTokenHandler,
  user.changeProfileController,
  res.profileImgChangeRes
);
userRoutes.delete(
  '/pfp',
  verifyTokenHandler,
  user.deleteProfileController,
  res.profileImgDeleteRes
);

userRoutes.patch(
  '/',
  verifyTokenHandler,
  user.updateUserDetails,
  res.profileUpdateRes
);
export { userRoutes };
