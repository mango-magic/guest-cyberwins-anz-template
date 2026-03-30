import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

// Deterministic particle data so no hydration mismatch
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: ((i * 37 + 11) % 97),
  top: ((i * 53 + 7) % 95),
  size: i % 3 === 0 ? 2.5 : i % 3 === 1 ? 1.5 : 1,
  duration: 6 + (i % 7) * 1.4,
  delay: (i * 0.35) % 5,
  opacity: i % 4 === 0 ? 0.75 : i % 4 === 1 ? 0.55 : i % 4 === 2 ? 0.4 : 0.65,
  isOrange: i % 5 === 0,
}));

const LINES = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  top: 15 + i * 17,
  duration: 9 + i * 2,
  delay: i * 1.8,
  width: 60 + (i * 23 % 80),
}));

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadeddata", () => setVideoLoaded(true));
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1);   opacity: var(--op); }
          50%  { transform: translateY(-18px) scale(1.15); opacity: calc(var(--op) * 1.3); }
          100% { transform: translateY(0px) scale(1);   opacity: var(--op); }
        }
        @keyframes driftRight {
          0%   { transform: translateX(-120px); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(calc(100vw + 120px)); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.18; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.28; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes shimmerBorder {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          height: "100vh",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* ── Background layer ── */}
        <div style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0 }}>

          {/* Pulsing ambient orb */}
          <div
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              width: "560px",
              height: "560px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, hsl(var(--exclusive-purple) / 0.5) 0%, hsl(var(--exclusive-orange) / 0.25) 55%, transparent 72%)",
              filter: "blur(72px)",
              animation: "pulseGlow 7s ease-in-out infinite",
            }}
          />

          {/* Subtle dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            }}
          />

          {/* Floating particles */}
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: "50%",
                background: p.isOrange
                  ? "hsl(var(--exclusive-orange))"
                  : "hsl(var(--exclusive-purple))",
                opacity: p.opacity,
                animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}

          {/* Drifting horizontal light lines */}
          {LINES.map((l) => (
            <div
              key={l.id}
              style={{
                position: "absolute",
                top: `${l.top}%`,
                left: 0,
                height: "1px",
                width: `${l.width}px`,
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--exclusive-purple) / 0.4), hsl(var(--exclusive-orange) / 0.3), transparent)",
                animation: `driftRight ${l.duration}s linear ${l.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* ── ZONE 1: Logo + Badge ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "12px 0 0",
            flexShrink: 0,
            animation: "fadeSlideUp 0.7s ease both",
          }}
        >
          <img
            src="https://pub-a2a1c741d75e42a1bfe46a442182bfed.r2.dev/c3f6eddd-72e9-46e0-872e-26ac824dac38/anz_logo.png"
            alt="CyberWins by Exclusive Networks"
            style={{ height: "220px", width: "auto", maxWidth: "600px", marginBottom: "2px", marginTop: "-40px" }}
          />
          <span className="font-sans text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-exclusive-orange/40 text-exclusive-orange bg-exclusive-orange/10 -mt-7">
            Australia & New Zealand
          </span>
        </div>

        {/* ── ZONE 2: Video ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
            animation: "fadeSlideUp 0.7s ease 0.35s both",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "auto",
              maxWidth: "720px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow:
                "0 0 0 1px hsl(var(--exclusive-purple) / 0.12), 0 6px 24px hsl(var(--exclusive-purple) / 0.10), 0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {/* Animated shimmer border top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(to right, hsl(var(--exclusive-purple)), hsl(var(--exclusive-orange)))",
                backgroundSize: "200% 200%",
                animation: "shimmerBorder 3s linear infinite",
                zIndex: 20,
              }}
            />

            {/* Loading shimmer */}
            {!videoLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "hsl(var(--exclusive-purple) / 0.03)",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="animate-bounce"
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "hsl(var(--exclusive-orange))",
                        display: "block",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Custom play/pause overlay */}
            {videoLoaded && (
              <div
                onClick={togglePlay}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  background: isPlaying ? "transparent" : "rgba(0,0,0,0.3)",
                  transition: "background 0.3s",
                }}
              >
                {!isPlaying && (
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s, background 0.2s",
                      boxShadow:
                        "0 2px 12px hsl(var(--exclusive-purple) / 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(255,255,255,0.18)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "scale(1)";
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        borderLeft: "18px solid rgba(255,255,255,0.9)",
                        marginLeft: "4px",
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            <video
              ref={videoRef}
              playsInline
              preload="metadata"
              style={{
                display: "block",
                width: "100%",
                maxHeight: "calc(100vh - 250px - 160px)",
                objectFit: "cover",
                background: "#0a0a0a",
              }}
            >
              <source
                src="https://pub-a2a1c741d75e42a1bfe46a442182bfed.r2.dev/c3f6eddd-72e9-46e0-872e-26ac824dac38/CyberWins-Intro-_1_.mp4"
                type="video/mp4"
              />
              <source
                src="https://pub-a2a1c741d75e42a1bfe46a442182bfed.r2.dev/c3f6eddd-72e9-46e0-872e-26ac824dac38/CyberWins%20Intro.mov"
                type="video/quicktime"
              />
            </video>
          </div>
        </div>

        {/* ── ZONE 3: Text + CTAs ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "12px 24px 20px",
            gap: "6px",
            animation: "fadeSlideUp 0.7s ease 0.5s both",
          }}
        >
          <p
            className="font-sans text-xl font-medium md:text-2xl lg:text-3xl tracking-wide animate-fade-in text-[hsl(var(--foreground1)/0.9)]"
            style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
          >
            Your Story. Your Success.{" "}
            <span className="bg-gradient-to-br from-exclusive-purple to-exclusive-orange bg-clip-text text-transparent">
              Your Stage.
            </span>
          </p>

          <div
            style={{
              height: "1px",
              width: "40px",
              background:
                "linear-gradient(90deg, transparent, hsl(var(--exclusive-purple) / 0.6), transparent)",
            }}
          />

          <p
            className="mx-auto max-w-xl font-sans text-sm text-[hsl(var(--muted-foreground1))] font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}
          >
            You're about to share your cyber security win with the ANZ community.
            We've put together something special to showcase your expertise — here's what to expect.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "6px",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outline"
              onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-[hsl(var(--foreground1)/0.2)] bg-transparent text-[hsl(var(--foreground1))] hover:bg-[hsl(var(--foreground1)/0.05)] font-medium text-sm px-6 py-5"
            >
              See the Journey
            </Button>

            <Button
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScVwUkvdxNCJbXOtWVyZgdyjXUgn-VB7QMWf3NonjVNVjHUBw/viewform?usp=header', '_blank')}
              className="font-medium text-sm px-6 py-5 bg-gradient-to-r from-exclusive-purple to-exclusive-orange hover:opacity-90 text-white border-0"

            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;