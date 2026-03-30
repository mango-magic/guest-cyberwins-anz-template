import { Button } from "@/components/ui/button";
import cyberWinsLogo from "@/assets/cyberwins-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      <div className="container relative z-10 mx-auto px-6 py-8 text-center">
        <div className="mx-auto max-w-4xl space-y-5">
          {/* CyberWins Logo */}
          <div className="flex justify-center mb-4 animate-fade-in">
            <img
              src={cyberWinsLogo}
              alt="CyberWins by Exclusive Networks"
              className="h-auto w-full max-w-xs md:max-w-sm"
            />
          </div>
          
          {/* Tagline */}
          <p 
            className="font-sans text-xl font-medium md:text-2xl lg:text-3xl tracking-wide animate-fade-in text-white" 
            style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
          >
            Your Story. Your Success. Your Stage.
          </p>
          
          {/* Decorative divider */}
          <div className="flex justify-center py-2 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-exclusive-purple to-transparent" />
          </div>
          
          {/* Subtitle */}
          <p className="mx-auto max-w-xl font-sans text-base text-[hsl(0_0%_60%)] md:text-lg font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
            You're about to share your cybersecurity win with a global audience. We've built something special to showcase your expertise—here's what to expect.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'backwards' }}>
            <Button 
              size="lg"
              className="font-medium text-sm px-6 py-5 bg-gradient-to-r from-exclusive-purple to-exclusive-orange hover:opacity-90 text-white border-0"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See the Journey
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border border-[hsl(var(--border)/0.2)] bg-transparent text-[hsl(var(--foreground1))] hover:bg-[hsl(var(--foreground1)/0.05)] font-medium text-sm px-6 py-5"
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              What You Get
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
