import { Resend } from 'resend';

type NotificationField = {
  label: string;
  value: string | null | undefined;
};

type NotificationOptions = {
  subject: string;
  previewText: string;
  fields: NotificationField[];
};

const apiKey = process.env.RESEND_API_KEY?.trim() ?? '';
const resend = apiKey ? new Resend(apiKey) : null;
const fromEmail =
  process.env.FROM_EMAIL?.trim() ||
  process.env.RESEND_FROM_EMAIL?.trim() ||
  'Dogwood Select <noreply@dogwoodselect.com>';
const replyToEmail =
  process.env.CONTACT_ALERT_EMAIL?.trim() ||
  process.env.NOTIFICATION_EMAIL?.trim() ||
  process.env.RESEND_REPLY_TO?.trim() ||
  undefined;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderFieldRows(fields: NotificationField[]) {
  return fields
    .filter((field) => field.value && String(field.value).trim())
    .map(
      (field) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #ece6de;font-weight:700;color:#161617;vertical-align:top;width:180px;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #ece6de;color:#38383d;white-space:pre-wrap;">
            ${escapeHtml(String(field.value))}
          </td>
        </tr>
      `
    )
    .join('');
}

function renderTextFields(fields: NotificationField[]) {
  return fields
    .filter((field) => field.value && String(field.value).trim())
    .map((field) => `${field.label}: ${String(field.value)}`)
    .join('\n');
}

function htmlWithLineBreaks(value: string) {
  return escapeHtml(value).replaceAll('\n', '<br/>');
}

type CustomerConfirmationOptions = {
  email: string;
  name?: string;
  subject: string;
  heading: string;
  intro: string;
  details: string;
};

export async function sendNotification({ subject, previewText, fields }: NotificationOptions) {
  const toEmail =
    process.env.CONTACT_ALERT_EMAIL?.trim() ||
    process.env.NOTIFICATION_EMAIL?.trim() ||
    '';

  if (!toEmail || !resend) {
    console.warn('Notification email is not configured. Skipping email send.', {
      hasApiKey: Boolean(apiKey),
      hasNotificationEmail: Boolean(toEmail),
    });
    return { ok: false, skipped: true as const };
  }

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      replyTo: replyToEmail ? [replyToEmail] : undefined,
      text: `${previewText}\n\n${renderTextFields(fields)}`,
      html: `
        <div style="margin:0;padding:24px;background:#fbf6f0;font-family:Arial,sans-serif;">
          <div style="max-width:720px;margin:0 auto;background:#fffdf9;border:1px solid #ece6de;border-radius:18px;overflow:hidden;">
            <div style="padding:22px 24px;background:linear-gradient(135deg,#fff8f1,#f7efe6);border-bottom:1px solid #ece6de;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#ef8b77;font-weight:700;">Dogwood Select</p>
              <h1 style="margin:0;font-size:24px;line-height:1.2;color:#161617;">${escapeHtml(subject)}</h1>
              <p style="margin:10px 0 0;color:#5b565c;line-height:1.6;">${escapeHtml(previewText)}</p>
            </div>
            <div style="padding:8px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;">
                ${renderFieldRows(fields)}
              </table>
            </div>
          </div>
        </div>
      `,
    });

    console.log('Dogwood Select Resend notification sent', {
      subject,
      to: toEmail,
      id: result.data?.id ?? null,
    });

    return { ok: true as const, id: result.data?.id ?? null };
  } catch (error) {
    console.error('Failed to send notification email', {
      subject,
      to: toEmail,
      error,
    });
    return { ok: false as const, skipped: false as const, error };
  }
}

async function sendCustomerConfirmationEmail({
  email,
  name,
  subject,
  heading,
  intro,
  details,
}: CustomerConfirmationOptions) {
  if (!email || !resend) {
    console.warn('Customer confirmation email skipped.', {
      hasApiKey: Boolean(apiKey),
      hasEmail: Boolean(email),
    });
    return { ok: false, skipped: true as const };
  }

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject,
      replyTo: replyToEmail ? [replyToEmail] : undefined,
      text: `Hi ${name || 'there'},\n\n${intro}\n\n${details}\n\nIf you have photos, access notes, or anything specific you want us to see, reply directly to this email.\n\nTalk soon,\nBrandon\nDogwood Select`,
      html: `
        <div style="margin:0;padding:24px;background:#fbf6f0;font-family:Arial,sans-serif;">
          <div style="max-width:640px;margin:0 auto;background:#fffdf9;border:1px solid #ece6de;border-radius:18px;overflow:hidden;">
            <div style="padding:22px 24px;background:linear-gradient(135deg,#fff8f1,#f7efe6);border-bottom:1px solid #ece6de;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#ef8b77;font-weight:700;">Dogwood Select</p>
              <h1 style="margin:0;font-size:24px;line-height:1.2;color:#161617;">${escapeHtml(heading)}</h1>
            </div>
            <div style="padding:22px 24px;color:#38383d;line-height:1.7;">
              <p>Hi ${escapeHtml(name || 'there')},</p>
              <p>${htmlWithLineBreaks(intro)}</p>
              <p>${htmlWithLineBreaks(details)}</p>
              <p>If you have photos, access notes, or anything specific you want us to see, reply directly to this email.</p>
              <p>Talk soon,<br/>Brandon<br/>Dogwood Select</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('Dogwood Select customer confirmation sent', {
      to: email,
      id: result.data?.id ?? null,
    });

    return { ok: true as const, id: result.data?.id ?? null };
  } catch (error) {
    console.error('Failed to send customer confirmation email', {
      to: email,
      error,
    });
    return { ok: false as const, skipped: false as const, error };
  }
}

export async function sendCustomerConfirmation(name: string, email: string) {
  return sendCustomerConfirmationEmail({
    email,
    name,
    subject: 'Dogwood Select received your consultation request',
    heading: 'Your consultation request has been received',
    intro: 'Thanks for reaching out to Dogwood Select.',
    details:
      'Your consultation request has been received, and we’re reviewing the details so we can get a clear feel for the property and the work needed.\n\nWe focus on sharp curb appeal, clean communication, and exterior work that makes a property feel properly cared for. You can expect a follow-up call within one hour during business hours.',
  });
}

export async function sendBookingConfirmation(name: string, email: string) {
  return sendCustomerConfirmationEmail({
    email,
    name,
    subject: 'Dogwood Select received your booking request',
    heading: 'Your booking request has been received',
    intro: 'Thanks for reaching out to Dogwood Select.',
    details:
      'Your booking request has been received, and we’re reviewing the preferred timing and service details so we can get a clear feel for the property and the work needed.\n\nWe focus on sharp curb appeal, clean communication, and exterior work that makes a property feel properly cared for. You can expect a follow-up call within one hour during business hours.',
  });
}

export async function sendContactConfirmation(name: string, email: string) {
  return sendCustomerConfirmationEmail({
    email,
    name,
    subject: 'Dogwood Select received your message',
    heading: 'Your message has been received',
    intro: 'Thanks for reaching out to Dogwood Select.',
    details:
      'Your message has been received, and we’re reviewing the details so we can get a clear feel for the property and the kind of help you need.\n\nWe focus on sharp curb appeal, clean communication, and exterior work that makes a property feel properly cared for. You can expect a follow-up call within one hour during business hours.',
  });
}

export async function sendReferralConfirmation(name: string, email: string) {
  return sendCustomerConfirmationEmail({
    email,
    name,
    subject: 'Dogwood Select received your referral',
    heading: 'Your referral has been received',
    intro: 'Thanks for reaching out to Dogwood Select.',
    details:
      'Your referral has been received, and we’re reviewing the details so we can get a clear feel for the property and the service needs being passed along.\n\nWe focus on sharp curb appeal, clean communication, and exterior work that makes a property feel properly cared for. You can expect a follow-up from us during business hours.',
  });
}
