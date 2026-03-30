const About = () => {
  return (
    <section id="about" className="relative bg-[hsl(0_0%_0%)] py-24 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-purple/30 to-transparent" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Section title */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="font-sans text-3xl font-semibold md:text-4xl text-[hsl(var(--foreground1))]">
              A Simple, Professional Process
            </h2>
            <div className="mx-auto h-px w-16 bg-exclusive-orange" />
          </div>
          
          {/* Main description */}
          <div className="space-y-6 text-center">
            <p className="font-sans text-xl leading-relaxed text-[hsl(0_0%_95%)] md:text-2xl font-light">
              From our <span className="font-medium text-exclusive-orange">30-minute conversation</span> to a complete content package delivered to you—we handle everything.
            </p>
            
            <p className="font-sans text-lg leading-relaxed text-[hsl(var(--muted-foreground1))] font-light">
              No slides. No pitches. Just an honest conversation about your real experiences and insights. We take care of the recording, editing, distribution, and content creation.
            </p>
            
            <p className="font-sans text-lg leading-relaxed text-[hsl(var(--muted-foreground1))] font-light">
              You show up, share your win, and walk away with professional content ready to amplify your voice across your network.
            </p>
          </div>
          
          {/* Highlight statement */}
          <div className="relative rounded-lg bg-[hsl(var(--card1))] p-8 text-center border border-[hsl(var(--border)/0.1)]">
            <p className="font-sans text-lg font-medium text-[hsl(var(--foreground1))]">
              Relaxed. Vendor-neutral. Focused on what actually worked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
