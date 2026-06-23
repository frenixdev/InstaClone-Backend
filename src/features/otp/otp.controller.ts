import { Request, Response, NextFunction } from 'express';
import { sendOtpEmail } from '@/services/email/EmailService';
import { getRandNumber } from 'utils/getRandNum';
import { AppError } from 'utils/AppError';
import { OtpModel } from 'models';

export const getOtpController = async (
  req: Request<{}, {}, { email: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const otp = getRandNumber(900000, 100000).toString();
    const alreadySent = await OtpModel.findOne({ userEmail: email });

    if (alreadySent) {
      alreadySent.otp = otp;
      await alreadySent.save();
      await sendOtpEmail(email, otp);
      return res.status(200).json({
        success: true,
        message: 'otp sent successfully',
      });
    }
    await OtpModel.create({
      otp,
      userEmail: email,
    });
    await sendOtpEmail(email, otp);
    return res.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyOtpController = async (
  req: Request<{}, {}, { email: string; otp: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    const otpDB = await OtpModel.findOne({
      userEmail: email,
    });
    if (!otpDB) throw new AppError('otp not generated', 404);

    if (otpDB?.otp !== otp) {
      otpDB.attempt = otpDB.attempt + 1;
      if (otpDB.attempt >= 3) {
        await otpDB.deleteOne();
        throw new AppError('max attempts Reached', 400);
      }
      await otpDB.save();
      throw new AppError('Otp not matched ', 400);
    }
    otpDB.isVerified = true;
    await otpDB.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
