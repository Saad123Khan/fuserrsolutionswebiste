/** GET /api/health — quick check that the deployment is up and configured (never exposes secrets). */
export default function handler(_req, res) {
  res.status(200).json({
    ok: true,
    emailConfigured: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL),
    customSender: Boolean(process.env.CONTACT_FROM),
  });
}
