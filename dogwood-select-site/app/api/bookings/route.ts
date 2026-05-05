import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data.name || '').trim();
    const phone = String(data.phone || '').trim();
    const email = String(data.email || '').trim();
    const address = String(data.address || '').trim();
    const rawServiceTypes = Array.isArray(data.serviceTypes)
      ? data.serviceTypes.map((value: unknown) => String(value).trim()).filter(Boolean)
      : [];
    const preferredTimeline = String(data.preferredTimeline || '').trim();
    const preferredDate = String(data.preferredDate || '').trim();
    const preferredTime = String(data.preferredTime || '').trim();
    const notes = String(data.notes || '').trim();
    const projectType = rawServiceTypes.join(', ');

    if (!name || !phone || !email || !address || rawServiceTypes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        address,
        projectType: preferredTimeline ? `${projectType} | Timeline: ${preferredTimeline}` : projectType,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime: preferredTime || null,
        notes: notes || null,
      },
    });

    await sendNotification(
      'New Booking Request',
      `${name} requested a consultation for ${projectType} in ${address}.`
    );

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error('Booking submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Error processing request.' },
      { status: 500 }
    );
  }
}
