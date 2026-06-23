import mongoose from 'mongoose';
import { ILike } from 'types';
const likeSchema = new mongoose.Schema<ILike>(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: 'post',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export const LikeModel = mongoose.model<ILike>('like', likeSchema);
