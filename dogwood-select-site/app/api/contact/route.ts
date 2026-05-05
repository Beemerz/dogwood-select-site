import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/email';
import { asCleanString, combineNotes, parseRequestBody } from '@/lib/submissions';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { data } = await parseRequestBody(request);
    const name = asCleanString(data.name);
    const email = asCleanString(data.email);
    const phone = asCleanString(data.phone);
    const city = asCleanString(data.city || data.propertyArea || data.address);
    const serviceInterest = asCleanString(data.serviceInterest || data.serviceType);
    const message = asCleanString(data.message || data.notes || data.projectDescription);

    if (!name || (!email && !phone) || !message) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Name, a phone or email, and a message are required.',
        },
        { status: 400 }
      );
    }

    const persistedEmail = email || `phone-only-${Date.now()}@dogwoodselect.local`;
    const lead = await prisma.lead.create({
      data: {
        name,
        phone: phone || null,
        email: persistedEmail,
        address: city || null,
        serviceType: serviceInterest || 'Contact request',
        projectDescription: combineNotes([
          message,
          !email && phone ? 'Email was not provided.' : '',
        ]),
        priority: 'CONTACT',
      },
    });

    console.log('Dogwood Select submission saved', {
      type: 'contact',
      email: email || null,
      phone: phone || null,
      timestamp: new Date().toISOString(),
    });

    await sendNotification(
      'New Contact Form Submission',
      `${name} sent a website message. Email: ${email}. Phone: ${phone || 'Not provided'}. City: ${
        city || 'Not provided'
      }. Service interest: ${serviceInterest || 'Not provided'}. Message: ${message}`
    );

    return NextResponse.json({ ok: true, message: 'Submission saved successfully.', leadId: lead.id });
  } catch (error) {
    console.error('Contact submission failed:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to save your message right now.' },
      { status: 500 }
    );
  }
}
