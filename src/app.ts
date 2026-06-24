import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import cors from 'cors';
import { errorHandler } from '@/middlewares';
import * as Routes from '@/features';

const app = express();

//? Pre Middlewares
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://insta-clone-red-kappa.vercel.app',
      'http://10.120.35.33:5173',
    ],

    credentials: true,
  })
);
app.use(express.static('/public'));

//? Routes

app.use('/ping', async (_, res) => {
  res.sendStatus(200);
});
app.use('/api/auth', Routes.authRoutes);
app.use('/api/post', Routes.postRoutes);
app.use('/api/user', Routes.userRoutes);
app.use('/api/like', Routes.likeRoutes);
app.use('/api/comment', Routes.commentRoutes);
app.use('/api/otp', Routes.otpRoutes);
app.use('/api/feed', Routes.feedRoutes);

app.use('/', (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../public/index.html');
  res.sendFile(filePath);
});

//? Post middlewares
app.use(errorHandler);

export default app;
