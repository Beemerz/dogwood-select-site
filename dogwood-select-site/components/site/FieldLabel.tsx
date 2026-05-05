import type { ReactNode } from 'react';

export default function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink-soft">
      {children}
      {optional ? <span className="ml-1 text-ink-muted">(optional)</span> : null}
    </label>
  );
}
