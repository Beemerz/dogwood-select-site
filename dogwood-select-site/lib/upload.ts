import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const hasStorageConfig =
  Boolean(process.env.R2_ENDPOINT) &&
  Boolean(process.env.R2_ACCESS_KEY_ID) &&
  Boolean(process.env.R2_SECRET_ACCESS_KEY) &&
  Boolean(process.env.R2_BUCKET);

const s3 = hasStorageConfig
  ? new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
      },
    })
  : null;

export async function uploadFiles(files: File[]): Promise<{ key: string; url: string }[]> {
  if (!s3 || !process.env.R2_ENDPOINT || !process.env.R2_BUCKET) {
    console.warn('R2 storage is not configured. Skipping file upload.');
    return [];
  }

  const results: { key: string; url: string }[] = [];

  for (const file of files) {
    const key = `${crypto.randomUUID()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);
    results.push({ key, url: `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}/${key}` });
  }

  return results;
}
