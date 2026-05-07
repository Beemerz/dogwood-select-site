import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation, sendNotification } from '@/lib/email';
import { asCleanString, asStringArray, combineNotes, parseRequestBody } from '@/lib/submissions';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { data } = await parseRequestBody(request);
    const name = asCleanString(data.name);
    const phone = asCleanString(data.phone);
    const email = asCleanString(data.email);
    const address = asCleanString(data.address || data.city || data.propertyArea);
    const rawServiceTypes = asStringArray(data.serviceTypes ?? data.serviceType ?? data.projectType);
    const preferredTimeline = asCleanString(data.preferredTimeline);
    const preferredDate = asCleanString(data.preferredDate);
    const preferredTime = asCleanString(data.preferredTime);
    const notes = asCleanString(data.notes);
    const projectType = rawServiceTypes.join(', ');

    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      rawServiceTypes.length === 0 ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'Name, phone, email, property address or city, service type, preferred date, and preferred time are required.',
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        address,
        projectType,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime: preferredTime || null,
        notes: combineNotes([
          notes,
          preferredTimeline ? `Preferred timeline: ${preferredTimeline}` : '',
        ]),
      },
    });

    console.log('Dogwood Select submission saved', {
      type: 'book-consultation',
      email,
      phone,
      timestamp: new Date().toISOString(),
    });

    await sendNotification({
      subject: 'New Dogwood Select Booking',
      previewText: `${name} requested a consultation for ${projectType} in ${address}.`,
      fields: [
        { label: 'Submission type', value: 'Booking request' },
        { label: 'Name', value: name },
        { label: 'Phone', value: phone },
        { label: 'Email', value: email },
        { label: 'Property address', value: address },
        { label: 'Project / service type', value: projectType },
        { label: 'Preferred date', value: preferredDate },
        { label: 'Preferred time', value: preferredTime },
        { label: 'Preferred timeline', value: preferredTimeline || null },
        { label: 'Notes', value: notes || null },
      ],
    });
    await sendBookingConfirmation(name, email);

    return NextResponse.json({ ok: true, message: 'Submission saved successfully.', bookingId: booking.id });
  } catch (error) {
    console.error('Booking submission failed:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to save your consultation request right now.' },
      { status: 500 }
    );
  }
}
