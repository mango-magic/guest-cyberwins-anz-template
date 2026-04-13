import Hero from "@/components/anz/guestFolder/Hero";
import About from "@/components/anz/About";
import ValueProps from "@/components/anz/ValueProps";
import CTA from "@/components/anz/CTA";
import EpisodeGrid from "@/components/EpisodeGrid";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AnzGuests = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[hsl(var(--background1))]">
      <Hero />
      <About />
      <EpisodeGrid region="anz" />
      <ValueProps />
      <CTA />

      {/* Learn More CTA */}
      <section className="relative bg-[hsl(var(--card1))] py-16 border-t border-[hsl(var(--border1))]">
        <div className="container mx-auto px-6 text-center flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="border border-exclusive-orange/50 bg-transparent text-[hsl(var(--foreground1))] hover:bg-[hsl(var(--foreground1)/0.05)] font-medium text-sm px-6 py-5"
              onClick={() => window.open('https://cyber-wins.com/anz', '_blank')}
            >
              Learn More
            </Button>
            <Button
              size="lg"
              className="font-medium text-base px-8 py-6 bg-gradient-to-r from-exclusive-purple to-exclusive-orange hover:opacity-90 text-white border-0"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScVwUkvdxNCJbXOtWVyZgdyjXUgn-VB7QMWf3NonjVNVjHUBw/viewform?usp=header', '_blank')}
            >
              Join the Series
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-exclusive-orange/50 bg-transparent text-[hsl(var(--foreground1))] hover:bg-[hsl(var(--foreground1)/0.05)] font-medium text-sm px-6 py-5"
              onClick={() => navigate("/admin")}
            >
              Guest Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black py-10 border-t border-[hsl(var(--border1))]">
        <div className="container relative mx-auto px-6">
          <div className="text-center space-y-3">
            <p className="font-sans text-sm text-[hsl(var(--foreground1)/0.6)] font-light">
              <span className="text-exclusive-orange">CyberWins</span> ANZ is produced by Nextgen | Exclusive Networks
            </p>
            <p className="font-sans text-xs text-[hsl(var(--muted-foreground1)/0.4)] font-light">
              Vendor mentions are editorial, not paid placements · &copy; 2026 Nextgen | Exclusive Networks
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnzGuests;
