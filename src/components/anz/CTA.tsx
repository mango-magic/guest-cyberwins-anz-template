import { Film, Clapperboard, Music, Scissors, Quote, Globe } from "lucide-react";

const deliverables = [
  { icon: Film, label: "Full interview video", desc: "professionally edited" },
  { icon: Clapperboard, label: "Custom intro video", desc: "polished & branded" },
  { icon: Music, label: "Your own song", desc: "custom audio bumper" },
  { icon: Scissors, label: "Highlight clips", desc: "shareable moments" },
  { icon: Quote, label: "Quote clips", desc: "social-ready insights" },
  { icon: Globe, label: "Private website", desc: "all content, one link" },
];

const CTA = () => {
  return (
    <section id="cta" className="relative overflow-hidden bg-[hsl(var(--background1))] py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-purple/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-exclusive-purple/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-sans text-3xl font-semibold text-[hsl(var(--foreground1))] md:text-4xl">
              What You <span className="text-exclusive-orange">Receive</span>
            </h2>
            <p className="font-sans text-base text-[hsl(var(--muted-foreground1))] font-light">
              A complete content package — formatted, delivered, yours to keep
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center p-5 rounded-xl border border-[hsl(var(--border1))] hover:border-exclusive-orange/30 transition-all duration-300"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-exclusive-orange/10 group-hover:bg-exclusive-orange/20 transition-colors">
                  <item.icon className="h-5 w-5 text-exclusive-orange" />
                </div>
                <h3 className="font-sans text-sm font-medium text-[hsl(var(--foreground1))]">
                  {item.label}
                </h3>
                <p className="font-sans text-xs text-[hsl(var(--muted-foreground1))] font-light mt-0.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2 space-y-2">
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[hsl(var(--border1))] to-transparent" />
            <p className="font-sans text-sm text-[hsl(var(--muted-foreground1))] font-light pt-2">
              LinkedIn Live broadcast · ANZ cyber security community · Professional amplification
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
