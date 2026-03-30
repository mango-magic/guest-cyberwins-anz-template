const WhySection = () => {
  return (
    <section id="why" className="relative bg-black py-24 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-purple/40 to-transparent" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Section title */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="font-sans text-4xl font-bold md:text-5xl lg:text-6xl leading-[1.15] pb-1 text-white">
              Why <span className="bg-gradient-to-r from-exclusive-purple via-exclusive-orange to-exclusive-purple-light bg-clip-text text-transparent">CyberWins</span> exists
            </h2>
          </div>
          
          {/* Content */}
          <div className="space-y-8 text-center">
            <p className="font-sans text-lg leading-relaxed text-white/80 md:text-xl font-light">
              Enterprise security leaders across Australia &amp; New Zealand are under constant pressure — from boards, regulators, customers, and attackers. When things go wrong, expectations are higher, tolerance is lower, and scrutiny is immediate.
            </p>
            
            <p className="font-sans text-lg leading-relaxed text-white/80 md:text-xl font-light">
              <span className="text-white font-semibold">CyberWins exists to share real examples of what actually worked in enterprise security.</span> Not theory. Not predictions. Not product pitches.
            </p>
            
            <p className="font-sans text-lg leading-relaxed text-white/80 md:text-xl font-light">
              Every episode focuses on outcomes and decisions made in complex, real-world environments. So security leaders can learn from proven wins, not hindsight opinions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-orange/30 to-transparent" />
    </section>
  );
};

export default WhySection;