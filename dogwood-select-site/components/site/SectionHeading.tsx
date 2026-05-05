type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: Props) {
  const centered = align === 'center';

  return (
    <div className={`mx-auto mb-10 max-w-3xl ${centered ? 'text-center' : ''}`}>
      <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-ivory/70 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
