
import { env } from '@/config';

import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.log('Database connection error: ', error);
    process.exit();
  }
};
