import { Schema, model, Types } from 'mongoose';
import { IComment } from 'types';
const commentSchema = new Schema<IComment>(
  {
    postId: {
      type: Types.ObjectId,
      ref: 'post',
    },

    user: {
      type: Types.ObjectId,
      ref: 'user',
    },
    text: {
      type: String,
      required: [true, 'text is required to create a comment'],
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = model<IComment>("comment", commentSchema)
