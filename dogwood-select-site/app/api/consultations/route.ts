import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendCustomerConfirmation, sendNotification } from '@/lib/email';
import { uploadFiles } from '@/lib/upload';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const address = String(formData.get('address') || '').trim();
    const serviceTypes = formData.getAll('serviceTypes').map(String).filter(Boolean);
    const projectDescription = String(formData.get('projectDescription') || '').trim();
    const preferredTimeline = String(formData.get('preferredTimeline') || '').trim();
    const serviceType = serviceTypes.join(', ');

    if (!name || !phone || !email || !address || serviceTypes.length === 0 || !projectDescription) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const files: File[] = [];
    formData.forEach((value, key) => {
      if (key === 'images' && value instanceof File && value.size > 0) {
        files.push(value);
      }
    });

    const uploaded = files.length > 0 ? await uploadFiles(files) : [];

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        address,
        serviceType,
        projectDescription,
        preferredTimeline: preferredTimeline || null,
        images: {
          create: uploaded.map((file) => ({ url: file.url })),
        },
      },
    });

    await sendNotification(
      'New Self Consultation Submission',
      `${name} submitted a self consultation for ${serviceType} in ${address}.`
    );
    await sendCustomerConfirmation(name, email);

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Consultation submission failed:', error);
    return NextResponse.json(
      { success: false, error: 'Error processing request.' },
      { status: 500 }
    );
  }
}
