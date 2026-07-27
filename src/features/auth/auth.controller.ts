import { Request, Response, NextFunction } from 'express';
import { BlackListModel, OtpModel, UserModel } from 'models';
import bcrypt from 'bcryptjs';
import { AppError } from '@/utils/AppError';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username)
    throw new AppError('Please provide all the credentials', 400);

  try {
    const existingEmail = await UserModel.findOne({ email }).lean();
    if (existingEmail) throw new AppError('Email already exists', 400);

    const existingUsername = await UserModel.findOne({ username }).lean();
    if (existingUsername) throw new AppError('Username already exists', 400);

    // const otpRes = await OtpModel.findOne({
    //   userEmail: email,
    // });

    // if (!otpRes || !otpRes.isVerified)
    //   throw new AppError('please verify otp first', 400);
    // await otpRes.deleteOne();

    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      username,
      password: hash,
    });
    req.result = user;
    next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;
  if (!email && !username)
    throw new AppError('Email or username is required', 400);
  if (!password)
    throw new AppError('validation failed', 401, {
      username: 'username is required',
      password: 'password is required',
    });
  // try {
  const user = await UserModel.findOne({
    $or: [{ username }, { email }],
  })
    .select('+password')
    .lean();
  if (!user) throw new AppError("username or password doesn't match", 401);
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched)
    throw new AppError("username or password doesn't match", 401);
  req.result = user;
  next();
  // } catch (err) {
  //   console.log(err);
  //   next(err);
  // }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blackListToken = await BlackListModel.create({ token: req.token });
  if (!blackListToken) throw new AppError('unable to logout', 400);
  next();
};

interface ForgetBodyType {
  email: string;
  username: string;
  password: string;
}
export const forgetPasswordController = async (
  req: Request<{}, {}, ForgetBodyType>,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;
  try {
    const user = await UserModel.findOne({
      $and: [{ email }, { username }],
    });
    if (!user) throw new AppError('user not found!', 404);
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();
    req.result = user;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  try {
    const userDb = await UserModel.findById(user);
    if (!user) throw new AppError('user not found', 404);
    req.result = userDb;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
