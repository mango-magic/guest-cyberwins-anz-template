import { MessageSquare, Wand2, Globe } from "lucide-react";

const pillars = [
  {
    icon: MessageSquare,
    title: "30-min yarn",
    desc: "No slides. No pitches. Just your real story.",
  },
  {
    icon: Wand2,
    title: "We handle production",
    desc: "Editing, music, highlights, distribution.",
  },
  {
    icon: Globe,
    title: "Content delivered to you",
    desc: "Ready-to-share assets. Yours to keep.",
  },
];

const About = () => {
  return (
    <section id="about" className="relative bg-[hsl(var(--background1))] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-purple/30 to-transparent" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl space-y-14">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="font-sans text-3xl font-semibold md:text-4xl text-[hsl(var(--foreground1))]">
              How It Works
            </h2>
            <p className="font-sans text-lg text-[hsl(var(--muted-foreground1))] font-light max-w-lg mx-auto">
              You bring the story. We turn it into a complete content package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="group text-center p-8 rounded-xl border border-[hsl(var(--border1))] bg-[hsl(var(--card1))] hover:border-exclusive-purple/40 transition-all duration-300"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-exclusive-purple to-exclusive-orange">
                  <p.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-sans text-lg font-medium text-[hsl(var(--foreground1))] mb-2">
                  {p.title}
                </h3>
                <p className="font-sans text-sm text-[hsl(var(--muted-foreground1))] font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-1">
            <p className="font-sans text-base text-[hsl(var(--muted-foreground1))] font-light">
              Relaxed. Vendor-neutral. Focused on <span className="text-exclusive-orange font-medium">what actually worked</span>.
            </p>
            <p className="font-sans text-xs text-[hsl(var(--muted-foreground1)/0.6)] font-light">
              Brought to you by <span className="text-exclusive-orange font-medium">Nextgen</span> — Exclusive Networks for Australia & New Zealand
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
