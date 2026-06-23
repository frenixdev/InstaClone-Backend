import { NextFunction, Request, Response } from 'express';
import { UserModel } from 'models';
import { imageKit } from 'config';
import { AppError } from 'utils/AppError';

export const changeProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;
  const img = req.file;
  if (!img) throw new AppError('proper img required', 400);
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new AppError("User doesn't exits", 404);
    const imagekitRes = await imageKit.files.upload({
      file: img.buffer.toString('base64'),
      fileName: img.filename || `${user.username}-pfp`,
      folder: '/pfp',
    });
    if (!imagekitRes) throw new AppError('failed to change profile image', 400);
    user.profileImg = imagekitRes.url || user.profileImg;
    await user.save();
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deleteProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;
  try {
    const mongooseRes = await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $unset: { profileImg: 1 },
      }
    );
    if (!mongooseRes) throw new AppError('Unable to delete profile image', 400);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
interface UpdateBodyType {
  name?: string;
  bio?: string;
  username?: string;
}
export const updateUserDetails = async (
  req: Request<{}, {}, UpdateBodyType>,
  res: Response,
  next: NextFunction
) => {
  const { username, bio, name } = req.body;
  const userId = req.user;
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new AppError('unable to find user', 404);
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (name) user.name = name;
    await user.save();
    req.result = user;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
