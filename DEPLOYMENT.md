# Deployment Guide for NexusTrack

This monorepo contains both frontend and backend. Here are your deployment options:

## Option 1: Deploy Frontend to Vercel + Backend Separately

### Frontend (Vercel)

1. **Deploy Frontend to Vercel:**
   ```bash
   cd frontend
   vercel
   ```

2. **Set Environment Variables in Vercel:**
   - Go to your Vercel project settings
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api`

### Backend Options

Since your backend uses SQLite (file-based database), you'll need a hosting solution that supports persistent file storage:

#### Option A: Railway.app (Recommended)
1. Create account at [railway.app](https://railway.app)
2. Deploy backend:
   ```bash
   cd backend
   railway up
   ```
3. Add environment variables in Railway dashboard
4. Railway provides persistent volumes for SQLite

#### Option B: Render.com
1. Create account at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Set root directory to `backend`
5. Set build command: `npm install`
6. Set start command: `node server.js`
7. Add persistent disk for SQLite storage

#### Option C: Fly.io
1. Install flyctl
2. Deploy backend:
   ```bash
   cd backend
   fly launch
   fly deploy
   ```
3. Add volume for SQLite persistence

## Option 2: Deploy Both to Railway (Simpler)

Railway can handle monorepos well:

1. Push your code to GitHub
2. Connect GitHub repo to Railway
3. Railway will detect the monorepo
4. Create two services: frontend and backend
5. Configure environment variables

## Option 3: Switch to PostgreSQL for Better Scalability

For production, consider switching from SQLite to PostgreSQL:

1. Update `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update dependencies:
   ```bash
   cd backend
   npm install @prisma/client@latest prisma@latest
   ```

3. Deploy to any platform (Vercel can handle Postgres backends)

## Environment Variables

### Backend (.env)
```
PORT=5000
JWT_SECRET=your-secret-key-here
DATABASE_URL=file:./tasks.db  # or postgresql://...
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.com/api
```

## Deployment Checklist

- [ ] Set strong JWT_SECRET in production
- [ ] Enable CORS for your frontend domain only
- [ ] Use HTTPS for both frontend and backend
- [ ] Set up database backups (especially important for SQLite)
- [ ] Configure rate limiting
- [ ] Set up monitoring (e.g., Sentry)

## Quick Start Commands

### Local Development
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
NODE_ENV=production node server.js
```

## Notes

- SQLite is great for development but has limitations in production (single writer, file-based)
- Consider PostgreSQL or MySQL for production deployments
- Make sure to backup your SQLite database file regularly if using it in production
- The frontend can be deployed to any static hosting (Vercel, Netlify, Cloudflare Pages)
- The backend needs a platform that supports Node.js and persistent storage