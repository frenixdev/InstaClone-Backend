# InstaClone Backend

A Node.js + TypeScript backend for an Instagram-like application.

## Base URL

- Local: `http://localhost:3000`

## API Guide in Browser

After starting the server, open:

- `/` → Interactive/static API overview page

## Tech Stack

- Express 5
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- ImageKit (image hosting)

## Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment variables

Create a `.env` file in the project root and add the required values (MongoDB, JWT, ImageKit, etc.) based on `src/config/env.ts`.

### 3) Run in development

```bash
pnpm dev
```

### 4) Build for production

```bash
pnpm build
```

### 5) Start production build

```bash
pnpm start
```

## Main API Routes

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login using email or username + password
- `POST /api/auth/forget` — Reset password

### User

- `POST /api/user/pfp` — Upload profile image (`multipart/form-data`, field: `image-file`)
- `DELETE /api/user/pfp` — Delete profile image
- `PATCH /api/user` — Update profile details

### Post

- `GET /api/post` — Get authenticated user's posts
- `POST /api/post` — Create post (`multipart/form-data`, field: `image-file`, optional: `caption`)
- `DELETE /api/post/:postId` — Delete own post

### Comment

- `POST /comment/newComment` — Create comment
- `GET /comment/:postId` — Get comments by post
- `DELETE /comment/:commentId` — Delete comment

### Like

- `POST /api/like/post/:postId` — Toggle like/unlike

## Notes

- Protected routes require:
  - `Authorization: Bearer <token>`
- Request/response examples are available on the root route (`/`).
