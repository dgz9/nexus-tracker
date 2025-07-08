import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes, userRoutes, projectRoutes, taskRoutes } from './routes/index.js';
import prisma from './utils/prisma.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'NexusTrack API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`NexusTrack server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Database connection closed.');
  process.exit(0);
});