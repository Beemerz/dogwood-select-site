export default function FormSuccessCard({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <div className="panel-card rounded-[1.8rem] border-[color:rgba(239,139,119,0.22)] bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,241,233,0.96))] p-8 md:p-10">
      <p className="eyebrow">Submission Received</p>
      <h3 className="mt-5 font-display text-[2.35rem] leading-[1.02] text-ink-strong md:text-[3.3rem]">
        {title}
      </h3>
      <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">
        {copy}
      </p>
    </div>
  );
}
