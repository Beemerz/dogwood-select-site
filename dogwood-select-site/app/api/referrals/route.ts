import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      referrerName,
      referrerContact,
      referredName,
      referredContact,
      notes,
      interestedRecurring,
    } = data;
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerContact,
        referredName,
        referredContact,
        notes,
        interestedRecurring: Boolean(interestedRecurring),
      },
    });
    await sendNotification(
      'New Referral Submission',
      `A new referral was submitted by ${referrerName}.`
    );
    return NextResponse.json({ success: true, referralId: referral.id });
  } catch (err) {
    console.error(err);
    return new NextResponse('Error processing request', { status: 500 });
  }
}