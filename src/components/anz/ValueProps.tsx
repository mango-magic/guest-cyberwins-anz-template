import { Video, Scissors, Radio, Package, Globe, Sparkles, Users } from "lucide-react";

const workflowSteps = [
  {
    icon: Users,
    title: "Meet the Production Team",
    subtitle: "Initial briefing & planning",
    description: "We kick things off with a relaxed intro call. You'll meet the production crew, we'll walk through the format, answer any questions, and sort out scheduling.",
  },
  {
    icon: Video,
    title: "Recording Day",
    subtitle: "30-minute calendar invite",
    description: "A relaxed, vendor-neutral yarn about your win. No slides. No pitches. Just real experience, captured in a natural, professional conversation.",
  },
  {
    icon: Scissors,
    title: "Internal Review & Editing",
    subtitle: "We handle all production",
    description: "Our team polishes the video, creates a custom song for you, produces highlight clips, quote cards, and an intro video—all keeping your natural, professional tone.",
  },
  {
    icon: Radio,
    title: "Scheduling the Event",
    subtitle: "LinkedIn Live preparation",
    description: "We set up the LinkedIn Live Event, add you as Guest Speaker, prepare the event page with title, description, and cover image, then invite the right audience.",
  },
  {
    icon: Sparkles,
    title: "Livestream Day",
    subtitle: "Pre-recorded, broadcast live",
    description: "Your interview streams as a live broadcast on a scheduled date. Our team stays active in comments throughout. You're tagged where needed. Viewers engage in real time.",
  },
  {
    icon: Package,
    title: "Content Delivery",
    subtitle: "Complete package for you",
    description: "After the livestream, you receive the full interview, intro video, your custom song, multiple highlight clips, and quote clips—all formatted and ready to share.",
  },
  {
    icon: Globe,
    title: "Your Private Website",
    subtitle: "All materials in one place",
    description: "Everything uploaded to a private webpage dedicated to you: full video, intro, audio bumper, all clips. You get the link and use the content however you like.",
  },
];

const ValueProps = () => {
  return (
    <section className="relative bg-[hsl(var(--card1))] py-24 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--border1))] to-transparent" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Section title */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="font-sans text-3xl font-semibold md:text-4xl text-[hsl(var(--foreground1))]">
              The Complete Workflow
            </h2>
            <p className="font-sans text-base text-[hsl(var(--muted-foreground1))] font-light">
              From recording to final delivery—everything handled with care
            </p>
          </div>
          
          {/* Vertical timeline */}
          <div className="relative mx-auto max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-exclusive-purple via-exclusive-orange to-exclusive-purple/20 md:left-1/2 md:-translate-x-px" />

            {workflowSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="relative flex items-start gap-6 pb-12 last:pb-0 animate-fade-in md:gap-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
                >
                  {/* Mobile: icon left, content right */}
                  {/* Desktop: alternate sides */}

                  {/* Left content (desktop even rows) */}
                  <div className={`hidden md:flex md:w-1/2 md:pr-10 ${isEven ? 'md:justify-end' : 'md:opacity-0 md:pointer-events-none'}`}>
                    {isEven && (
                      <div className="group max-w-sm rounded-lg bg-[hsl(var(--background1))] p-6 border border-[hsl(var(--border1))] transition-all duration-300 hover:border-exclusive-purple/50 text-right">
                        <div className="flex items-center justify-end gap-3 mb-3">
                          <h3 className="font-sans text-lg font-medium text-[hsl(var(--foreground1))]">{step.title}</h3>
                          <step.icon className="h-5 w-5 text-[hsl(var(--muted-foreground1))] group-hover:text-exclusive-orange transition-colors shrink-0" />
                        </div>
                        <p className="font-sans text-sm text-exclusive-orange font-medium mb-2">{step.subtitle}</p>
                        <p className="font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground1))] font-light">{step.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Centre dot */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-exclusive-purple to-exclusive-orange shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="font-sans text-sm font-semibold text-white">{index + 1}</span>
                  </div>

                  {/* Right content (desktop odd rows) */}
                  <div className={`hidden md:flex md:w-1/2 md:pl-10 ${!isEven ? 'md:justify-start' : 'md:opacity-0 md:pointer-events-none'}`}>
                    {!isEven && (
                      <div className="group max-w-sm rounded-lg bg-[hsl(var(--background1))] p-6 border border-[hsl(var(--border1))] transition-all duration-300 hover:border-exclusive-purple/50">
                        <div className="flex items-center gap-3 mb-3">
                          <step.icon className="h-5 w-5 text-[hsl(var(--muted-foreground1))] group-hover:text-exclusive-orange transition-colors shrink-0" />
                          <h3 className="font-sans text-lg font-medium text-[hsl(var(--foreground1))]">{step.title}</h3>
                        </div>
                        <p className="font-sans text-sm text-exclusive-orange font-medium mb-2">{step.subtitle}</p>
                        <p className="font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground1))] font-light">{step.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Mobile content */}
                  <div className="flex-1 md:hidden">
                    <div className="group rounded-lg bg-[hsl(var(--background1))] p-5 border border-[hsl(var(--border1))] transition-all duration-300 hover:border-exclusive-purple/50">
                      <div className="flex items-center gap-3 mb-3">
                        <step.icon className="h-5 w-5 text-[hsl(var(--muted-foreground1))] group-hover:text-exclusive-orange transition-colors shrink-0" />
                        <h3 className="font-sans text-lg font-medium text-[hsl(var(--foreground1))]">{step.title}</h3>
                      </div>
                      <p className="font-sans text-sm text-exclusive-orange font-medium mb-2">{step.subtitle}</p>
                      <p className="font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground1))] font-light">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom highlight */}
          <div className="text-center pt-8">
            <p className="font-sans text-xl font-medium text-[hsl(var(--foreground1))]">
              Kept simple. Kept professional.
            </p>
            <p className="font-sans text-base text-[hsl(var(--muted-foreground1))] font-light mt-2">
              You bring the story. We take care of the production, distribution, and amplification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
