import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function sendNotification(subject: string, message: string) {
  const fromEmail = `Dogwood Select <noreply@dogwoodselect.com>`;
  const toEmail = process.env.NOTIFICATION_EMAIL ?? '';
  if (!toEmail) {
    console.warn('Notification email not configured');
    return;
  }
  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html: `<p>${message}</p>`,
    });
  } catch (err) {
    console.error('Failed to send notification email', err);
  }
}