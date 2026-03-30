import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpeakerCardProps {
  name: string;
  company: string;
  videoUrl: string;
  onPlay: () => void;
}

const SpeakerCard = ({ name, company, videoUrl, onPlay }: SpeakerCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Video thumbnail placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* Iframe for thumbnail - hidden but loads preview */}
        <iframe
          src={videoUrl}
          className="h-full w-full pointer-events-none"
          allow="autoplay"
          title={`${name} preview`}
        />
        
        {/* Overlay with play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-primary/30">
          <Button
            variant="secondary"
            size="lg"
            className="scale-100 transition-all duration-300 group-hover:scale-110"
            onClick={onPlay}
          >
            <Play className="mr-2 h-5 w-5 fill-current" />
            Watch Interview
          </Button>
        </div>
      </div>
      
      {/* Speaker info */}
      <div className="p-6 space-y-2">
        <h3 className="font-sans text-xl font-semibold text-foreground">
          {name}
        </h3>
        <p className="font-sans text-base text-muted-foreground">
          {company}
        </p>
      </div>
    </div>
  );
};

export default SpeakerCard;
