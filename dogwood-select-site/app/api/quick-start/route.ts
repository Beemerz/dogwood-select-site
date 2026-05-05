import { NextResponse } from 'next/server';
import { sendNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data.name || '').trim();
    const phone = String(data.phone || '').trim();
    const preferredDate = String(data.preferredDate || '').trim();
    const serviceTypes = Array.isArray(data.serviceTypes)
      ? data.serviceTypes.map((value: unknown) => String(value).trim()).filter(Boolean)
      : [];

    if (!name || !phone || !preferredDate || serviceTypes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    await sendNotification(
      'New Homepage Quick Start Request',
      `${name} requested a quick start for ${serviceTypes.join(', ')}. Phone: ${phone}. Preferred start date: ${preferredDate}.`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quick start submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Error processing request.' },
      { status: 500 }
    );
  }
}
