import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/email';
import { asCleanString, asStringArray, combineNotes, parseRequestBody } from '@/lib/submissions';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { data } = await parseRequestBody(request);
    const name = asCleanString(data.name);
    const phone = asCleanString(data.phone);
    const preferredDate = asCleanString(data.preferredDate);
    const serviceTypes = asStringArray(data.serviceTypes);

    if (!name || !phone || !preferredDate || serviceTypes.length === 0) {
      return NextResponse.json(
        { ok: false, message: 'Name, phone, preferred start date, and at least one service are required.' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email: `quick-start-${Date.now()}@dogwoodselect.local`,
        address: 'Homepage quick start',
        serviceType: serviceTypes.join(', '),
        projectDescription: combineNotes([
          'Homepage quick start request',
          `Preferred start date: ${preferredDate}`,
        ]),
      },
    });

    console.log('Dogwood Select submission saved', {
      type: 'quick-start',
      email: null,
      phone,
      timestamp: new Date().toISOString(),
    });

    await sendNotification({
      subject: 'New Homepage Quick Start Request',
      previewText: `${name} requested a quick start for ${serviceTypes.join(', ')}.`,
      fields: [
        { label: 'Name', value: name },
        { label: 'Phone', value: phone },
        { label: 'Preferred start date', value: preferredDate },
        { label: 'Service types', value: serviceTypes.join(', ') },
      ],
    });

    return NextResponse.json({ ok: true, message: 'Submission saved successfully.', leadId: lead.id });
  } catch (error) {
    console.error('Quick start submission failed:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to save that request right now.' },
      { status: 500 }
    );
  }
}
