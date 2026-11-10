/**
 * Local development server for the contact API (npm run dev).
 * In production the same logic runs as a Vercel function: see api/contact.js.
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { allowedOrigins, handleContact } from './lib/contact.js';

dotenv.config();

const app = express();
const origins = allowedOrigins();
app.use(cors({ origin: origins.length ? origins : false }));
app.use(express.json({ limit: '50kb' }));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, emailConfigured: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) });
});

app.post('/api/contact', async (req, res) => {
  try {
    const result = await handleContact(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error('contact handler failed', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Contact API server listening on port ${PORT}`);
});
