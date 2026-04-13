import { Link } from "react-router-dom";
import { profilesByRegion } from "@/data";
import { PlayCircle } from "lucide-react";
import type { ProfileData } from "@/components/profilePage";

interface EpisodeGridProps {
  region: "anz" | "usa";
}

export default function EpisodeGrid({ region }: EpisodeGridProps) {
  const episodes = profilesByRegion(region) as ProfileData[];

  if (episodes.length === 0) return null;

  return (
    <section className="relative py-20 bg-[hsl(var(--background1))]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-sans">
          <span className="text-exclusive-purple">Featured</span>{" "}
          <span className="text-exclusive-orange">Episodes</span>
        </h2>
        <p className="text-center text-[hsl(var(--muted-foreground1))] mb-12 max-w-xl mx-auto">
          Watch full interviews, highlights, and insights from cybersecurity leaders.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {episodes.map((ep) => (
            <Link
              key={ep.slug}
              to={`/${region}/${ep.slug}`}
              className="group relative rounded-xl overflow-hidden shadow-lg border border-[hsl(var(--border1)/0.2)] hover:border-exclusive-orange/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[hsl(var(--card1))]"
            >
              {/* Profile image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-exclusive-purple/20 to-exclusive-orange/10">
                <img
                  src={ep.hero.profileImage}
                  alt={ep.hero.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg font-sans drop-shadow-md leading-tight">
                    {ep.hero.name}
                  </h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Tagline */}
              <div className="p-4">
                <p className="text-xs text-[hsl(var(--muted-foreground1))] line-clamp-2 leading-relaxed">
                  {ep.hero.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
