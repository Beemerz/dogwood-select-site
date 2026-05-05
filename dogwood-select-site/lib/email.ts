import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY ?? '';
const resend = apiKey ? new Resend(apiKey) : null;
const fromEmail = 'Dogwood Select <noreply@dogwoodselect.com>';

export async function sendNotification(subject: string, message: string) {
  const toEmail = process.env.NOTIFICATION_EMAIL ?? '';

  if (!toEmail || !resend) {
    console.warn('Notification email is not configured. Skipping email send.');
    return;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html: `<p>${message}</p>`,
    });
  } catch (error) {
    console.error('Failed to send notification email', error);
  }
}

export async function sendCustomerConfirmation(name: string, email: string) {
  if (!email || !resend) {
    return;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Dogwood Select received your self consultation',
      html: `
        <p>Hi ${name || 'there'},</p>
        <p>We received your self consultation and sent it to the team.</p>
        <p>You can expect a confirmation email right away and a call within one hour during business hours.</p>
        <p>Talk soon,<br/>Dogwood Select</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send customer confirmation email', error);
  }
}
