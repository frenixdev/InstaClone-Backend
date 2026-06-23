import { Types } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  password: string;
  profileImg: string;
}

export interface IPost extends Document {
  _id?: string;
  caption: string;
  imageUrl: string;
  thumbnailUrl: string;
  author: Types.ObjectId;
  likeCount: number;
  commentCount: number;
}

export interface ILike extends Document {
  _id?: string;
  postId: Types.ObjectId;
  user: Types.ObjectId;
}

export interface IComment extends Document {
  _id?: string;
  postId: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
}
export interface IOtp {
  _id?: Types.ObjectId;
  otp: string;
  attempt: number;
  userEmail: string;
  isVerified: boolean;
}
