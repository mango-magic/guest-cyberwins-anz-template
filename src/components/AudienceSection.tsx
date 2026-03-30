import { Shield, Target, Award } from "lucide-react";

const audiences = [
  {
    icon: Shield,
    title: "CISOs, CIOs, CTOs, and Heads of Security"
  },
  {
    icon: Target,
    title: "Senior operators responsible for real outcomes"
  },
  {
    icon: Award,
    title: "Leaders who want practical lessons, not hype"
  }
];

const AudienceSection = () => {
  return (
    <section id="audience" className="relative bg-gradient-to-b from-black via-[#060212] to-black py-24 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Section title */}
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="font-sans text-4xl font-bold md:text-5xl lg:text-6xl leading-[1.15] pb-1 text-white">
              Who CyberWins is <span className="bg-gradient-to-r from-exclusive-purple via-exclusive-orange to-exclusive-green bg-clip-text text-transparent">for</span>
            </h2>
            <p className="font-sans text-lg text-white/70 md:text-xl font-light">
              CyberWins is built for:
            </p>
          </div>
          
          {/* Audience list */}
          <div className="space-y-4">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-exclusive-purple/40 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-exclusive-purple/30 to-exclusive-orange/30 flex items-center justify-center flex-shrink-0 group-hover:from-exclusive-purple/50 group-hover:to-exclusive-orange/50 transition-all">
                  <audience.icon className="h-6 w-6 text-white" />
                </div>
                <span className="font-sans text-lg md:text-xl text-white/90">{audience.title}</span>
              </div>
            ))}
          </div>
          
          {/* Bottom statement */}
          <div className="text-center pt-6">
            <p className="font-sans text-xl text-white/80 font-light leading-relaxed">
              If you're accountable for security decisions in an enterprise environment, <span className="text-white font-semibold">this is for you</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;