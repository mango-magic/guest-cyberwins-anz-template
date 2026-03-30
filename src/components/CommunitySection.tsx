import { MessageCircle, Radio, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Radio,
    text: "New episodes and clips are shared"
  },
  {
    icon: MessageCircle,
    text: "Live interviews are announced"
  },
  {
    icon: Users,
    text: "Leaders exchange lessons learned"
  },
  {
    icon: TrendingUp,
    text: "Patterns across industries start to emerge"
  }
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative bg-black py-24 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-exclusive-green/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-exclusive-purple/8 rounded-full blur-[100px]" />
      
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-green/30 to-transparent" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Section title */}
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="font-sans text-4xl font-bold md:text-5xl lg:text-6xl leading-[1.15] pb-1 text-white">
              More than a podcast.
              <span className="block mt-2 bg-gradient-to-r from-exclusive-green via-exclusive-orange to-exclusive-purple-light bg-clip-text text-transparent">
                A peer community.
              </span>
            </h2>
            <p className="font-sans text-lg text-white/70 md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              CyberWins is also a growing community of CISOs and senior cybersecurity leaders across the world.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-6">
            <p className="text-center font-sans text-lg text-white/80 font-medium">
              The community is where:
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-exclusive-green/40 hover:bg-white/8 transition-all duration-300 group"
                >
                  <div className="h-10 w-10 rounded-lg bg-exclusive-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-exclusive-green/30 transition-colors">
                    <feature.icon className="h-5 w-5 text-exclusive-green" />
                  </div>
                  <span className="font-sans text-base text-white/90">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;