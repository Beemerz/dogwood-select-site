import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      phone,
      email,
      address,
      projectType,
      preferredDate,
      preferredTime,
      notes,
    } = data;
    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        address,
        projectType,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime,
        notes,
      },
    });
    await sendNotification(
      'New Booking Request',
      `A new booking request was submitted by ${name}.`
    );
    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (err) {
    console.error(err);
    return new NextResponse('Error processing request', { status: 500 });
  }
}