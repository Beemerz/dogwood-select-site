export default function FormSuccessCard({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <div className="panel-card rounded-[1.8rem] p-8">
      <p className="eyebrow">Submission Received</p>
      <h3 className="mt-4 font-display text-3xl text-ink-strong">{title}</h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">{copy}</p>
    </div>
  );
}
