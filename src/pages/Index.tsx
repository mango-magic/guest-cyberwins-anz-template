import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import PodcastSection from "@/components/PodcastSection";
import CommunitySection from "@/components/CommunitySection";
import AudienceSection from "@/components/AudienceSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <WhySection />
      <PodcastSection />
      <CommunitySection />
      <AudienceSection />
      <FinalCTA />
      
      {/* Footer */}
      <footer className="relative bg-black py-16 border-t border-white/10">
        <div className="container relative mx-auto px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            {/* Disclosure */}
            <div className="space-y-4">
              <p className="font-sans text-sm text-white/60 font-light leading-relaxed">
                <span className="text-white font-medium">CyberWins</span> is produced by <span className="text-exclusive-orange">Exclusive Networks</span>.
              </p>
              <p className="font-sans text-sm text-white/50 font-light leading-relaxed">
                Exclusive Networks brings together perspectives across vendors, industries, and architectures.
              </p>
              <p className="font-sans text-xs text-white/40 font-light">
                Vendor mentions in CyberWins are editorial, not paid placements.
              </p>
            </div>
            
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <p className="font-sans text-xs text-white/30 font-light">
              © 2026 Exclusive Networks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;