import { Schema, model } from 'mongoose';
import { IOtp } from '../types';

const OtpShema = new Schema<IOtp>(
  {
    userEmail: {
      type: String,
      required: [true, 'userEmail is required!'],
    },
    attempt: String,
    otp: {
      type: String,
      required: [true, 'Otp is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    expires: 600,
  }
);

export const OtpModel = model('otp', OtpShema);
