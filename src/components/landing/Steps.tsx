import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  { title: "Pick a source", body: "World news, technology and science from publishers that offer free RSS feeds." },
  { title: "Read the headline", body: "Clean cards with the summary and a link straight to the original story." },
  { title: "Save to your orbit", body: "One tap keeps an article on your private dashboard, ready when you are." },
];

export function Steps() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionHeading eyebrow="How it works" title="Read · Save · Return" align="center" className="mb-14" />
      <ol className="grid gap-5 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="glass flex flex-col gap-4 rounded-3xl p-8">
            <span className="font-mono text-sm text-amber">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="font-serif text-3xl text-ivory">{step.title}</h3>
            <p className="text-sm leading-relaxed text-ivory/60">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
