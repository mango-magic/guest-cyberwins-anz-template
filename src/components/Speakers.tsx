import { useState } from "react";
import SpeakerCard from "./SpeakerCard";
import VideoModal from "./VideoModal";

const speakers = [
  {
    name: "Julio Andrés Rozo",
    company: "Amazonia Emprende",
    videoUrl: "https://drive.google.com/file/d/1l70uoH1lOevbimQ2zQ3sjCp4J-j-SgaC/preview",
  },
  {
    name: "Jake Brenner",
    company: "MIT",
    videoUrl: "https://drive.google.com/file/d/1FjqZ52LSrVgTSLpEp-WaFinGPLd8W8vB/preview",
  },
  {
    name: "Danny Lough",
    company: "The Wilds",
    videoUrl: "https://drive.google.com/file/d/1KcYEDRW2UsooL1kZ1FD-xvuM0Sk9-cQO/preview",
  },
  {
    name: "Ryan Zinn",
    company: "Dr. Bronner's",
    videoUrl: "https://drive.google.com/file/d/1ei8YnXMESOvjQssEQ-ZyW91V47LJ_3uH/preview",
  },
  {
    name: "Benoît Clément",
    company: "Quantum Apex",
    videoUrl: "https://drive.google.com/file/d/1m_DqaLGLYbUlpSBHbr3kVGwTH12QEwKv/preview",
  },
  {
    name: "Diego Chaparro",
    company: "Open Forest Protocol",
    videoUrl: "https://drive.google.com/file/d/1vbQeZog5CI-up3jSWtoMTB_OqYCcxEKr/preview",
  },
  {
    name: "Ana Patrícia Brás",
    company: "Colquimica Adhesives",
    videoUrl: "https://drive.google.com/file/d/1zcOMA_MKm-us9AXU1WpTZyx8Kg5wAn6k/preview",
  },
  {
    name: "Ylva Frithiofson",
    company: "Rambdoll Environment",
    videoUrl: "https://drive.google.com/file/d/14hWt01bNfthu8eBVLnWOoLI3L_bI1rSo/preview",
  },
  {
    name: "Robert Mollee",
    company: "INTOS",
    videoUrl: "https://drive.google.com/file/d/1Y37X7Z4Fh35D1ru_8el3J3ZhkHIQei7M/preview",
  },
];

const Speakers = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<{ name: string; company: string } | null>(null);

  const handlePlayVideo = (videoUrl: string, name: string, company: string) => {
    setSelectedVideo(videoUrl);
    setSelectedSpeaker({ name, company });
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setSelectedSpeaker(null);
  };

  return (
    <section id="speakers" className="bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section title */}
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl font-semibold text-foreground md:text-5xl">
              Past Speakers
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Learn from industry leaders who are making real, verified climate impact
            </p>
            <div className="mx-auto h-1 w-24 rounded-full bg-primary" />
          </div>
          
          {/* Speakers grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={index}
                name={speaker.name}
                company={speaker.company}
                videoUrl={speaker.videoUrl}
                onPlay={() => handlePlayVideo(speaker.videoUrl, speaker.name, speaker.company)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
        videoUrl={selectedVideo || ""}
        speakerName={selectedSpeaker?.name || ""}
        speakerCompany={selectedSpeaker?.company || ""}
      />
    </section>
  );
};

export default Speakers;
