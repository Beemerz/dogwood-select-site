import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendCustomerConfirmation, sendNotification } from '@/lib/email';
import {
  asCleanString,
  asOptionalString,
  asStringArray,
  buildPhotoNote,
  combineNotes,
  parseRequestBody,
} from '@/lib/submissions';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { data, files } = await parseRequestBody(request);
    const name = asCleanString(data.name);
    const phone = asCleanString(data.phone);
    const email = asCleanString(data.email);
    const address = asCleanString(data.address || data.propertyArea || data.city);
    const serviceTypes = asStringArray(data.serviceTypes ?? data.serviceInterest ?? data.serviceType);
    const projectDescription = asCleanString(data.projectDescription);
    const preferredTimeline = asOptionalString(data.preferredTimeline);
    const budgetRange = asOptionalString(data.budgetRange);
    const priority = asOptionalString(data.priority);
    const referralName = asOptionalString(data.referralName);
    const referralContact = asOptionalString(data.referralContact);
    const serviceType = serviceTypes.join(', ');
    const photoNames = [
      ...asStringArray(data.photoNames),
      ...files.map((file) => file.name).filter(Boolean),
    ];

    if (!name || !phone || !email || !address || serviceTypes.length === 0 || !projectDescription) {
      return NextResponse.json(
        { ok: false, message: 'Name, phone, email, property area, service interest, and project description are required.' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        address,
        serviceType,
        projectDescription: combineNotes([projectDescription, buildPhotoNote(photoNames)]),
        preferredTimeline,
        budgetRange,
        priority,
        referralName,
        referralContact,
      },
    });

    console.log('Dogwood Select submission saved', {
      type: 'self-consultation',
      email,
      phone,
      timestamp: new Date().toISOString(),
    });

    await sendNotification({
      subject: 'New Self Consultation Submission',
      previewText: `${name} submitted a self consultation for ${serviceType} in ${address}.`,
      fields: [
        { label: 'Name', value: name },
        { label: 'Phone', value: phone },
        { label: 'Email', value: email },
        { label: 'Property area', value: address },
        { label: 'Service interest', value: serviceType },
        { label: 'Project description', value: projectDescription },
        { label: 'Preferred timeline', value: preferredTimeline },
        { label: 'Budget range', value: budgetRange },
        { label: 'Priority', value: priority },
        { label: 'Referral name', value: referralName },
        { label: 'Referral contact', value: referralContact },
        { label: 'Photos selected', value: photoNames.join(', ') || null },
      ],
    });
    await sendCustomerConfirmation(name, email);

    return NextResponse.json({ ok: true, message: 'Submission saved successfully.', leadId: lead.id });
  } catch (error) {
    console.error('Consultation submission failed:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to save your self consultation right now.' },
      { status: 500 }
    );
  }
}
