import ImageKit from '@imagekit/nodejs';
import { env } from './env';

const config = {
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  urlEndPoint: env.IMAGEKIT_URL,
};
export const imageKit = new ImageKit(config);
