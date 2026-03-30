import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  speakerName: string;
  speakerCompany: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl, speakerName, speakerCompany }: VideoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-serif text-2xl font-semibold text-foreground">
            {speakerName}
            <span className="block font-sans text-base font-normal text-muted-foreground mt-1">
              {speakerCompany}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative aspect-video w-full bg-muted">
          {videoUrl && (
            <iframe
              src={videoUrl}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={`${speakerName} interview`}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
