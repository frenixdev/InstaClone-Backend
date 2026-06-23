import mongoose from 'mongoose';
import { IUser } from 'types';
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'user with this email already exists'],
      match: [/^[\w._]+@[a-zA-Z]+.[a-zA-Z]{2,}$/, 'invalid email'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: [true, 'user with this username already exists'],
      match: [/^[^\d][\w]{3,}$/, 'invalid username'],
      trim: true,
    },
    password: {
      type: String,
      minLength: [8, 'password should be minimum 8 characters required'],
      // match: [/^[a-zA-Z0-9_@&]+$/, 'invalid password'],
      select: false,
      required: [true, 'password is required'],
    },
    profileImg: {
      type: String,
      default: 'https://ik.imagekit.io/frenixdev/assets/images.png',
    },
    bio: {
      type: String,
      default: "Hey there, I'm new to instagram!",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>('user', userSchema);

export { UserModel };
