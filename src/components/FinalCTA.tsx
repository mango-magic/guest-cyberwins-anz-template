import { Button } from "@/components/ui/button";
import { MessageCircle, Users } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="cta" className="relative overflow-hidden bg-gradient-to-br from-exclusive-purple/20 via-black to-exclusive-orange/10 py-24">
      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-20 w-[500px] h-[500px] bg-exclusive-purple/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-exclusive-orange/10 rounded-full blur-[120px]" />
      
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-exclusive-purple/50 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center space-y-10">
          <h2 className="font-sans text-4xl font-bold text-white md:text-5xl lg:text-6xl leading-[1.15] pb-1">
            Do you have a story <span className="bg-gradient-to-r from-exclusive-orange via-exclusive-purple-light to-exclusive-green bg-clip-text text-transparent">worth sharing?</span>
          </h2>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="font-sans text-lg leading-relaxed text-white/80 md:text-xl font-light">
              If you've delivered a real cyber win and are open to sharing what worked, we'd love to hear from you.
            </p>
            
            <p className="font-sans text-base leading-relaxed text-white/60 font-light">
              Message the CyberWins LinkedIn page to start a conversation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg"
              className="group relative font-semibold text-lg px-12 py-7 bg-gradient-to-r from-exclusive-purple to-exclusive-orange hover:from-exclusive-orange hover:to-exclusive-purple text-white border-0 transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(156,2,125,0.4)]"
              onClick={() => window.open('https://www.linkedin.com/company/exclusive-networks-podcast-series/?viewAsMember=true', '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Message us on LinkedIn
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="group relative border-2 border-exclusive-orange/50 bg-exclusive-orange/10 text-white hover:bg-exclusive-orange/20 hover:border-exclusive-orange font-semibold text-lg px-12 py-7 transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = '/usa/guests'}
            >
              <Users className="mr-2 h-5 w-5" />
              Guest Portal
            </Button>
          </div>
          <p className="font-sans text-sm text-white/40 font-light pt-2">
            Exclusive access for our distinguished guests — resources, materials, and everything you need for your CyberWins appearance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;