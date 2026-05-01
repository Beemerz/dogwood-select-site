import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const referrerName = String(data.referrerName || '').trim();
    const referrerContact = String(data.referrerContact || '').trim();
    const referredName = String(data.referredName || '').trim();
    const referredContact = String(data.referredContact || '').trim();
    const notes = data.notes ? String(data.notes).trim() : null;

    if (!referrerName || !referrerContact || !referredName || !referredContact) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const interestedRecurring =
      data.interestedRecurring === true ||
      data.interestedRecurring === 'true' ||
      data.interestedRecurring === 'on';

    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerContact,
        referredName,
        referredContact,
        notes,
        interestedRecurring,
      },
    });

    await sendNotification(
      'New Referral Submission',
      `A new referral was submitted by ${referrerName}.`
    );

    return NextResponse.json({ success: true, referralId: referral.id });
  } catch (err) {
    console.error('Referral submission failed:', err);
    return NextResponse.json(
      { success: false, error: 'Error processing referral request' },
      { status: 500 }
    );
  }
}
