import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3 = new S3Client({
  region: 'auto', // R2 uses 'auto' region
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
});

/**
 * Upload a list of File objects to R2/S3 and return their URLs.
 * @param files An array of Blob/File objects (from FormData)
 */
export async function uploadFiles(files: File[]): Promise<{ key: string; url: string }[]> {
  const results: { key: string; url: string }[] = [];
  for (const file of files) {
    const key = `${crypto.randomUUID()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET ?? '',
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });
    await s3.send(command);
    const url = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}/${key}`;
    results.push({ key, url });
  }
  return results;
}
