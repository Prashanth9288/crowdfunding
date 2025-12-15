import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import campaignRoutes from './routes/campaigns.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('FundFlow API is running');
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fundflow';
console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    // process.exit(1); // Optional: Exit if DB fails, but Render suggests keeping it alive for logs
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
