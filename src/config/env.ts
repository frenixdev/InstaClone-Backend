import 'dotenv/config';

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Invalid environment variable: ${key}`);
  return value;
};
export const env = {
  MONGO_URI: requiredEnv('MONGO_URI'),
  JWT_SECRET: requiredEnv('JWT_SECRET'), 
  IMAGEKIT_URL: requiredEnv('IMAGEKIT_URL'),
  IMAGEKIT_PRIVATE_KEY: requiredEnv('IMAGEKIT_PRIVATE_KEY'),
  IMAGEKIT_PUBLIC_KEY: requiredEnv('IMAGEKIT_PUBLIC_KEY'),
  SENDGIRD_API_KEY: requiredEnv('SENDGIRD_API_KEY'),
  USER_EMAIL: requiredEnv('USER_EMAIL'),
};
