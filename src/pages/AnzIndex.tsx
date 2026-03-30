import Hero from "@/components/anz/Hero";
import WhySection from "@/components/anz/WhySection";
import PodcastSection from "@/components/anz/PodcastSection";
import CommunitySection from "@/components/anz/CommunitySection";
import AudienceSection from "@/components/anz/AudienceSection";
import FinalCTA from "@/components/anz/FinalCTA";


const AnzIndex = () => {
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
                <span className="text-white font-medium">CyberWins Australia &amp; New Zealand</span> is produced by <span className="text-exclusive-orange">Nextgen</span>.
              </p>
              <p className="font-sans text-sm text-white/50 font-light leading-relaxed">
                Nextgen brings together perspectives across vendors, industries, and architectures throughout Australia &amp; New Zealand.
              </p>
              <p className="font-sans text-xs text-white/40 font-light">
                Vendor mentions in CyberWins are editorial, not paid placements.
              </p>
            </div>
            
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <p className="font-sans text-xs text-white/30 font-light">
              © 2026 Nextgen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnzIndex;