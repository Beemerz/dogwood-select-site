type JsonRecord = Record<string, unknown>;

export function asCleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function asOptionalString(value: unknown) {
  const normalized = asCleanString(value);
  return normalized || null;
}

export function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => asCleanString(item)).filter(Boolean);
  }

  const single = asCleanString(value);
  return single ? [single] : [];
}

export async function parseRequestBody(request: Request): Promise<{
  data: JsonRecord;
  files: File[];
}> {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const json = (await request.json()) as JsonRecord;
    return { data: json, files: [] };
  }

  const formData = await request.formData();
  const data: JsonRecord = {};
  const files: File[] = [];

  for (const [key, value] of Array.from(formData.entries())) {
    if (value instanceof File) {
      if (value.size > 0) {
        files.push(value);
      }

      if (!data[key]) {
        data[key] = [];
      }

      if (Array.isArray(data[key])) {
        (data[key] as unknown[]).push(value.name);
      }
      continue;
    }

    const existing = data[key];
    if (existing === undefined) {
      data[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      data[key] = [existing, value];
    }
  }

  return { data, files };
}

export function buildPhotoNote(photoNames: string[]) {
  if (photoNames.length === 0) {
    return '';
  }

  return `Photos selected: ${photoNames.join(', ')}`;
}

export function combineNotes(parts: Array<string | null | undefined>) {
  return parts
    .map((part) => (part || '').trim())
    .filter(Boolean)
    .join('\n\n');
}
