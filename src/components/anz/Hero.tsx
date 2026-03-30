import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import cyberWinsLogo from "@/assets/cyberwins-logo-black.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Solid black backdrop to match the logo's baked black and eliminate any visible box */}
      
      <div className="container relative z-10 mx-auto px-6 py-8 text-center">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-4 animate-fade-in">
            <div className="relative inline-block">
              {/* Feathered black plate so the logo's baked background disappears into the hero lighting */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-24 rounded-full"
                style={{
                  backgroundImage:
                    "radial-gradient(closest-side, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.98) 58%, rgba(0,0,0,0) 78%)",
                }}
              />
              <img
                src='https://pub-a2a1c741d75e42a1bfe46a442182bfed.r2.dev/c3f6eddd-72e9-46e0-872e-26ac824dac38/anz_logo.png'
                alt="CyberWins"
                className="relative h-64 w-auto md:h-80 lg:h-96"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>
          
          {/* ANZ badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-exclusive-orange/20 border border-exclusive-orange/30 animate-fade-in"
            style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}
          >
            <span className="font-sans text-sm font-medium text-exclusive-orange">Australia & New Zealand Edition</span>
          </div>

          {/* Main heading */}
          <h1 
            className="font-sans text-xl font-bold leading-[1.15] pb-2 sm:text-2xl md:text-3xl lg:text-4xl animate-fade-in text-white" 
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            What actually works in enterprise cybersecurity
            <span className="block mt-2 bg-gradient-to-r from-exclusive-purple via-exclusive-orange to-exclusive-purple-light bg-clip-text text-transparent">
              — and why
            </span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="mx-auto max-w-3xl font-sans text-lg text-white/70 md:text-xl lg:text-2xl font-light leading-relaxed animate-fade-in" 
            style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
          >
            Real-world security wins from Australia &amp; New Zealand, unpacked by the CISOs and security leaders who delivered them.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
            <Button 
              size="lg"
              className="group relative font-semibold text-lg px-10 py-7 bg-gradient-to-r from-exclusive-purple to-exclusive-purple-light hover:from-exclusive-purple-light hover:to-exclusive-purple text-white border-0 transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(156,2,125,0.4)]"
              onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch the latest episode
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="group relative border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 font-semibold text-lg px-10 py-7 transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://www.linkedin.com/company/nextgen-group/', '_blank')}
            >
              <Users className="mr-2 h-5 w-5" />
              Join the CyberWins community
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;