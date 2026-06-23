import { IComment, IPost } from './index';
import { Request } from 'express';
import { HydratedDocument, LeanDocument } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: string;
      token?: string;
      // userObj?: HydratedDocument<IUser>;
      // post?: HydratedDocument<IPost>;
      // posts?: LeanDocument<IPost>[];
      // comment?: HydratedDocument<IComment>
      isTrue?: boolean;
      result? : HydratedDocument<IUser> | HydratedDocument<IPost> | LeanDocument<IPost>[] | HydratedDocument<IComment>
    }
  }
}

export {}
