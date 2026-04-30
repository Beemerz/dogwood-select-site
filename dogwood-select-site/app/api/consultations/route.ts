import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadFiles } from '@/lib/upload';
import { sendNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string | null;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string | null;
    const serviceType = formData.get('serviceType') as string;
    const projectDescription = formData.get('projectDescription') as string | null;
    const preferredTimeline = formData.get('preferredTimeline') as string | null;
    const budgetRange = formData.get('budgetRange') as string | null;
    const referralName = formData.get('referralName') as string | null;
    const referralContact = formData.get('referralContact') as string | null;
    const priority = formData.get('priority') as string | null;
    // Collect uploaded files (could be multiple)
    const files: File[] = [];
    formData.forEach((value, key) => {
      if (key === 'images' && value instanceof File && value.size > 0) {
        files.push(value);
      }
    });
    let uploaded: { key: string; url: string }[] = [];
    if (files.length > 0) {
      uploaded = await uploadFiles(files);
    }
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        address,
        serviceType,
        projectDescription,
        preferredTimeline,
        budgetRange,
        referralName,
        referralContact,
        priority,
        images: {
          create: uploaded.map((u) => ({ url: u.url })),
        },
      },
    });
    // Send notification email
    await sendNotification(
      'New Self Consultation Submission',
      `A new self consultation was submitted by ${name}.`
    );
    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    console.error(err);
    return new NextResponse('Error processing request', { status: 500 });
  }
}