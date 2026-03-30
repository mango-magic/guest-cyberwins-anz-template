import { Video, Scissors, Radio, Package, Globe, Sparkles } from "lucide-react";

const workflowSteps = [
  {
    icon: Video,
    title: "Recording Day",
    subtitle: "30-minute calendar invite",
    description: "First 5 minutes: Quick briefing. Next 25 minutes: A relaxed, vendor-neutral conversation about your win. No slides. No pitches. Just real experience.",
  },
  {
    icon: Scissors,
    title: "Internal Review & Editing",
    subtitle: "We handle all production",
    description: "Our team cleans up the video, creates a custom song for you, produces highlight clips, quote card1s, and an intro video—all keeping the natural, professional tone.",
  },
  {
    icon: Radio,
    title: "Scheduling the Event",
    subtitle: "LinkedIn Live preparation",
    description: "We create the LinkedIn Live Event, add you as Guest Speaker, prepare the event page with title, description, and cover image, then invite the right audience.",
  },
  {
    icon: Sparkles,
    title: "Livestream Day",
    subtitle: "Pre-recorded, broadcast live",
    description: "Your interview streams as a live broadcast on a scheduled date. Our team stays active in comments throughout. You're tagged where needed. Viewers engage in real-time.",
  },
  {
    icon: Package,
    title: "Content Delivery",
    subtitle: "Complete package for you",
    description: "After the livestream, receive the full interview, intro video, your custom song, multiple highlight clips, and quote clips—all formatted for easy sharing.",
  },
  {
    icon: Globe,
    title: "Your Private Website",
    subtitle: "All materials in one place",
    description: "Everything uploaded to a private webpage dedicated to you: full video, intro, audio bumper, all clips. You get the link and use the content however you choose.",
  },
];

const ValueProps = () => {
  return (
    <section className="relative bg-[hsl(var(--card1))] py-24 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--border)/0.2)] to-transparent" />
      
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
          
          {/* Workflow grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className="group relative rounded-lg bg-[hsl(var(--background1))] p-6 border border-[hsl(var(--border)/0.2)] transition-all duration-300 hover:border-exclusive-purple/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
              >
                <div className="space-y-4">
                  {/* Step number and icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-exclusive-purple to-exclusive-orange">
                      <span className="font-sans text-sm font-semibold text-white">{index + 1}</span>
                    </div>
                    <step.icon className="h-5 w-5 text-[hsl(var(--muted-foreground1))] group-hover:text-exclusive-orange transition-colors" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-sans text-lg font-medium text-[hsl(var(--foreground1))]">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-exclusive-orange font-medium">
                      {step.subtitle}
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground1))] font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom highlight */}
          <div className="text-center pt-8">
            <p className="font-sans text-xl font-medium text-[hsl(var(--foreground1))]">
              Everything kept simple and professional.
            </p>
            <p className="font-sans text-base text-[hsl(var(--muted-foreground1))] font-light mt-2">
              You bring the story. We bring the production, distribution, and amplification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
