import { Users, Video, Scissors, Radio, Sparkles, Package, Globe } from "lucide-react";

const steps = [
  { icon: Users, title: "Meet", desc: "Relaxed intro call with the production team." },
  { icon: Video, title: "Record", desc: "30-min yarn. No slides, no pitches." },
  { icon: Scissors, title: "Edit", desc: "Video, custom song, highlights, intro — all produced." },
  { icon: Radio, title: "Schedule", desc: "LinkedIn Live event with you as Guest Speaker." },
  { icon: Sparkles, title: "Go Live", desc: "Pre-recorded broadcast, real-time engagement." },
  { icon: Package, title: "Deliver", desc: "Full interview, clips, song, intro — all yours." },
  { icon: Globe, title: "Publish", desc: "Private webpage, ready to share." },
];

const ValueProps = () => {
  return (
    <section id="workflow" className="relative bg-[hsl(var(--card1))] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--border1))] to-transparent" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="text-center space-y-3">
            <h2 className="font-sans text-3xl font-semibold md:text-4xl text-[hsl(var(--foreground1))]">
              The Journey
            </h2>
            <p className="font-sans text-base text-[hsl(var(--muted-foreground1))] font-light">
              Seven steps from conversation to content
            </p>
          </div>

          {/* Step flow — wraps on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group relative text-center p-5 rounded-xl bg-[hsl(var(--background1))] border border-[hsl(var(--border1))] hover:border-exclusive-purple/40 transition-all duration-300"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-exclusive-purple to-exclusive-orange text-[10px] font-bold text-white shadow-md">
                  {i + 1}
                </div>

                <step.icon className="mx-auto h-7 w-7 text-[hsl(var(--muted-foreground1))] group-hover:text-exclusive-orange transition-colors mb-3 mt-1" />
                <h3 className="font-sans text-sm font-semibold text-[hsl(var(--foreground1))] mb-1.5">
                  {step.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground1))] font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center font-sans text-lg font-medium text-[hsl(var(--foreground1))]">
            You bring the story. <span className="text-exclusive-orange">We handle the rest.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
