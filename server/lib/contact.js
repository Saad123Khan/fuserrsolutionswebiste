import { Resend } from 'resend';

/**
 * Shared contact-form logic used by both the local Express server (index.js)
 * and the Vercel serverless function (api/contact.js).
 */

const MAX_LEN = { name: 120, company: 160, role: 120, email: 200, service: 120, budget: 60, timeline: 60, message: 5000 };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const clip = (v, key) => (v == null ? '' : String(v).trim().slice(0, MAX_LEN[key]));

/** Origins allowed to call the API (comma-separated ALLOWED_ORIGINS). */
export function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}

/**
 * Validate the payload and send the email via Resend.
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function handleContact(payload) {
  const data = payload || {};
  const name = clip(data.name, 'name');
  const email = clip(data.email, 'email');
  const message = clip(data.message, 'message');

  if (!name || !email || !message) {
    return { status: 400, body: { error: 'Missing required fields' } };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { error: 'Please enter a valid email address' } };
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return { status: 500, body: { error: 'Email service is not configured' } };
  }

  const safe = {
    name: escapeHtml(name),
    company: escapeHtml(clip(data.company, 'company')),
    role: escapeHtml(clip(data.role, 'role')),
    email: escapeHtml(email),
    service: escapeHtml(clip(data.service, 'service')),
    budget: escapeHtml(clip(data.budget, 'budget')),
    timeline: escapeHtml(clip(data.timeline, 'timeline')),
    message: escapeHtml(message).replace(/\n/g, '<br>'),
  };

  const row = (label, value, bold = false) =>
    value
      ? `<tr><td style="padding:8px 0;color:#64748b;width:140px">${label}</td><td style="padding:8px 0;color:#1e293b${bold ? ';font-weight:600' : ''}">${value}</td></tr>`
      : '';

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    // Resend's test sender only delivers to the Resend account owner's address.
    // With a verified domain, set CONTACT_FROM (e.g. 'Fuserr Website <noreply@fuserrsolutions.com>').
    from: process.env.CONTACT_FROM || 'Contact Form <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New Project Inquiry from ${name}${data.company ? ` — ${clip(data.company, 'company')}` : ''}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#1e293b;border-bottom:2px solid #3b82f6;padding-bottom:12px">New Project Inquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          ${row('Name', safe.name, true)}
          ${row('Company', safe.company, true)}
          ${row('Role', safe.role)}
          <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${safe.email}" style="color:#3b82f6">${safe.email}</a></td></tr>
          ${row('Service', safe.service)}
          ${row('Budget', safe.budget)}
          ${row('Timeline', safe.timeline)}
        </table>
        <div style="margin-top:16px">
          <div style="color:#64748b;margin-bottom:6px">Project Description</div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;color:#1e293b;line-height:1.6">${safe.message}</div>
        </div>
        <p style="margin-top:20px;font-size:12px;color:#94a3b8">Reply directly to this email to respond to ${safe.name}.</p>
      </div>
    `,
  });

  if (error) return { status: 500, body: { error: error.message } };
  return { status: 200, body: { success: true } };
}
