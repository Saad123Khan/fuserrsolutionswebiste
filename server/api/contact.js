import { allowedOrigins, handleContact } from '../lib/contact.js';

/**
 * Vercel serverless function: POST /api/contact
 * The website (on GoDaddy) calls this cross-origin, so CORS is handled here.
 */
export default async function handler(req, res) {
  const origin = req.headers.origin;
  const allowed = allowedOrigins();

  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Browsers from other sites are rejected; server-to-server calls without an Origin are allowed.
  if (origin && !allowed.includes(origin)) return res.status(403).json({ error: 'Origin not allowed' });

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  try {
    const result = await handleContact(body);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error('contact handler failed', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
