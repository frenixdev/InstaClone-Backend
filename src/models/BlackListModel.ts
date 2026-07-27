import mongoose from 'mongoose';

const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'Token is required'],
    },
  },
  { timestamps: true }
);

export const BlackListModel = mongoose.model("blacklist", blackListSchema);

