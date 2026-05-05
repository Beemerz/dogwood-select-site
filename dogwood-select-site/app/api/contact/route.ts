import { NextResponse } from 'next/server';
import { sendNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const phone = String(data.phone || '').trim();
    const city = String(data.city || '').trim();
    const serviceInterest = String(data.serviceInterest || '').trim();
    const message = String(data.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    await sendNotification(
      'New Contact Form Submission',
      `${name} sent a website message. Email: ${email}. Phone: ${phone || 'Not provided'}. City: ${
        city || 'Not provided'
      }. Service interest: ${serviceInterest || 'Not provided'}. Message: ${message}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Error processing contact request.' },
      { status: 500 }
    );
  }
}
