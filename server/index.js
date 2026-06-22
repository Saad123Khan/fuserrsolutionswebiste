import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.post('/api/contact', async (req, res) => {
  const { name, company, role, email, budget, timeline, message } = req.body;

  if (!name || !company || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New Project Inquiry from ${name} — ${company}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#1e293b;border-bottom:2px solid #3b82f6;padding-bottom:12px">New Project Inquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#64748b;width:140px">Name</td><td style="padding:8px 0;color:#1e293b;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Company</td><td style="padding:8px 0;color:#1e293b;font-weight:600">${company}</td></tr>
          ${role ? `<tr><td style="padding:8px 0;color:#64748b">Role</td><td style="padding:8px 0;color:#1e293b">${role}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#3b82f6">${email}</a></td></tr>
          ${budget ? `<tr><td style="padding:8px 0;color:#64748b">Budget</td><td style="padding:8px 0;color:#1e293b">${budget}</td></tr>` : ''}
          ${timeline ? `<tr><td style="padding:8px 0;color:#64748b">Timeline</td><td style="padding:8px 0;color:#1e293b">${timeline}</td></tr>` : ''}
        </table>
        <div style="margin-top:16px">
          <div style="color:#64748b;margin-bottom:6px">Project Description</div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;color:#1e293b;line-height:1.6">${message.replace(/\n/g, '<br>')}</div>
        </div>
        <p style="margin-top:20px;font-size:12px;color:#94a3b8">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Contact API server listening on port ${PORT}`);
});
