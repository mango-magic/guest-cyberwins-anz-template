import { useState } from "react";
import { Mic, ArrowRight, Play } from "lucide-react";
import thumbnailDan from "@/assets/thumbnail-dan-wilkins.jpg";
import thumbnailWayne from "@/assets/thumbnail-wayne-towson.jpg";

const PodcastSection = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section id="podcast" className="relative bg-gradient-to-b from-black via-[#0a0318] to-black py-24 overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-exclusive-purple/5 rounded-full blur-[150px]" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Section title */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-exclusive-purple/20 border border-exclusive-purple/30">
              <Mic className="h-4 w-4 text-exclusive-purple-light" />
              <span className="font-sans text-sm font-medium text-exclusive-purple-light">The Podcast</span>
            </div>
            <h2 className="font-sans text-4xl font-bold md:text-5xl lg:text-6xl leading-[1.15] pb-1 text-white">
              The CyberWins <span className="bg-gradient-to-r from-exclusive-orange to-exclusive-purple-light bg-clip-text text-transparent">podcast</span>
            </h2>
            <p className="font-sans text-lg text-white/70 md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              CyberWins is a podcast featuring CISOs and senior cybersecurity leaders from Australia &amp; New Zealand, unpacking one real cyber win at a time.
            </p>
          </div>
          
          {/* Key points */}
          <div className="space-y-8">
            <p className="text-center font-sans text-lg text-white/80 font-light">
              Each conversation goes beyond the headline and into the details that matter:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "What triggered the need for change",
                "The decisions that shaped the outcome",
                "The trade-offs that had to be made",
                "What held up once everything was live"
              ].map((point, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-exclusive-purple/40 transition-all duration-300 group"
                >
                  <ArrowRight className="h-5 w-5 text-exclusive-orange flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  <span className="font-sans text-base text-white/90">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Result statement */}
          <div className="relative rounded-2xl bg-gradient-to-r from-exclusive-purple/10 via-exclusive-orange/10 to-exclusive-purple/10 p-8 md:p-12 border border-exclusive-purple/20">
            <p className="font-sans text-xl md:text-2xl text-white text-center leading-relaxed">
              The result is a growing library of <span className="font-semibold text-exclusive-orange">practical, repeatable security playbooks</span>. Told directly by the people who delivered them.
            </p>
          </div>
          
          {/* Featured Episodes */}
          <div className="space-y-6">
            <h3 className="text-center font-sans text-2xl font-semibold text-white">Featured Episodes</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Episode 1 - Dan Wilkins */}
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                {/* Video/Thumbnail */}
                <div className="aspect-video w-full relative">
                  {playingVideo === "dan" ? (
                    <iframe
                      src="https://drive.google.com/file/d/1hLZSe3pMs9i3jjMCyMFkppl5XsS4XEll/preview"
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="CyberWins Episode 1 - Dan Wilkins"
                    />
                  ) : (
                    <button
                      onClick={() => setPlayingVideo("dan")}
                      className="w-full h-full relative group cursor-pointer"
                    >
                      <img
                        src={thumbnailDan}
                        alt="Dan Wilkins interview thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-exclusive-purple/90 group-hover:bg-exclusive-purple group-hover:scale-110 transition-all flex items-center justify-center shadow-lg shadow-exclusive-purple/30">
                          <Play className="h-7 w-7 md:h-8 md:w-8 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
                {/* Guest Info */}
                <div className="p-5 space-y-1 border-t border-white/10">
                  <p className="font-sans text-xs text-exclusive-orange font-medium uppercase tracking-wide">Episode 1</p>
                  <h4 className="font-sans text-lg font-semibold text-white">Dan Wilkins</h4>
                  <p className="font-sans text-sm text-white/60">CISO | Trusted advisor in cybersecurity strategy and risk management</p>
                </div>
              </div>
              
              {/* Episode 2 - Wayne Towson */}
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                {/* Video/Thumbnail */}
                <div className="aspect-video w-full relative">
                  {playingVideo === "wayne" ? (
                    <iframe
                      src="https://drive.google.com/file/d/1QoMWYulfxUYlbzeLzuXKsNfouNnT-fbT/preview"
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="CyberWins Episode 2 - Wayne Towson"
                    />
                  ) : (
                    <button
                      onClick={() => setPlayingVideo("wayne")}
                      className="w-full h-full relative group cursor-pointer"
                    >
                      <img
                        src={thumbnailWayne}
                        alt="Wayne Towson interview thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-exclusive-purple/90 group-hover:bg-exclusive-purple group-hover:scale-110 transition-all flex items-center justify-center shadow-lg shadow-exclusive-purple/30">
                          <Play className="h-7 w-7 md:h-8 md:w-8 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
                {/* Guest Info */}
                <div className="p-5 space-y-1 border-t border-white/10">
                  <p className="font-sans text-xs text-exclusive-orange font-medium uppercase tracking-wide">Episode 2</p>
                  <h4 className="font-sans text-lg font-semibold text-white">Wayne Towson</h4>
                  <p className="font-sans text-sm text-white/60">Cybersecurity Expert | Developed the Loss and Stolen Travel Document Database to enhance international border security systems.</p>
                </div>
              </div>
            </div>

            {/* Spotify & YouTube */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="https://open.spotify.com/show/3xnCEmKSqfIZ53GJD0h4W5?si=79d8ce40bd374eda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 hover:bg-[#1DB954]/25 hover:border-[#1DB954]/50 transition-all duration-300 group"
              >
                <svg className="h-5 w-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                <span className="font-sans text-sm font-medium text-[#1DB954]">Listen on Spotify</span>
              </a>
              <a
                href="https://youtube.com/@cyberwinsanz?si=lXOJ1GRF74JHTmni"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FF0000]/15 border border-[#FF0000]/30 hover:bg-[#FF0000]/25 hover:border-[#FF0000]/50 transition-all duration-300 group"
              >
                <svg className="h-5 w-5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                <span className="font-sans text-sm font-medium text-[#FF0000]">Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
