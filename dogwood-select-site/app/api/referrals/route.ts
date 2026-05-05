import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/email';
import { asCleanString, combineNotes, parseRequestBody } from '@/lib/submissions';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { data } = await parseRequestBody(request);
    const referrerName = asCleanString(data.referrerName);
    const referrerContact = asCleanString(data.referrerContact);
    const friendName = asCleanString(data.friendName || data.referredName);
    const friendContact = asCleanString(data.friendContact || data.referredContact);
    const friendServiceInterest = asCleanString(data.friendServiceInterest || data.serviceInterest);
    const notes = asCleanString(data.notes);
    const consent =
      data.consent === true || data.consent === 'true' || data.consent === 'on' || data.consent === 'yes';
    const interestedRecurring =
      data.interestedRecurring === true ||
      data.interestedRecurring === 'true' ||
      data.interestedRecurring === 'on' ||
      data.interestedRecurring === 'yes';

    if (!referrerName || !referrerContact || !friendName || !friendContact || !friendServiceInterest || !consent) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'Referrer name, referrer contact, friend name, friend contact, friend service interest, and consent are required.',
        },
        { status: 400 }
      );
    }

    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerContact,
        referredName: friendName,
        referredContact: friendContact,
        notes: combineNotes([
          `Friend service interest: ${friendServiceInterest}`,
          notes,
        ]),
        interestedRecurring,
      },
    });

    console.log('Dogwood Select submission saved', {
      type: 'referral',
      email: referrerContact.includes('@') ? referrerContact : null,
      phone: referrerContact.includes('@') ? null : referrerContact,
      timestamp: new Date().toISOString(),
    });

    await sendNotification(
      'New Referral Submission',
      `${referrerName} referred ${friendName} to Dogwood Select for ${friendServiceInterest}.`
    );

    return NextResponse.json({ ok: true, message: 'Submission saved successfully.', referralId: referral.id });
  } catch (error) {
    console.error('Referral submission failed:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to save the referral right now.' },
      { status: 500 }
    );
  }
}
