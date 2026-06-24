import mongoose, { Types } from 'mongoose';
import { IPost } from 'types';

const PostSchema = new mongoose.Schema<IPost>(
  {
    caption: {
      type: String,
      default: '',
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'image url is required'],
    },
    author: {
      type: Types.ObjectId,
      ref: 'user',
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model<IPost>('post', PostSchema);
