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
    const consent =
      data.consent === true || data.consent === 'true' || data.consent === 'on' || data.consent === 'yes';

    if (!referrerName || !referrerContact || !referredName || !referredContact || !consent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerContact,
        referredName,
        referredContact,
        notes,
        interestedRecurring: false,
      },
    });

    await sendNotification(
      'New Referral Submission',
      `${referrerName} referred ${referredName} to Dogwood Select.`
    );

    return NextResponse.json({ success: true, referralId: referral.id });
  } catch (error) {
    console.error('Referral submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Error processing referral request.' },
      { status: 500 }
    );
  }
}
