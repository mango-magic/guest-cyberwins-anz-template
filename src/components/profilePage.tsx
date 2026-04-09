"use client"

import React from "react"
import { useState } from "react"
import { PlayCircle, Mic, Video, Podcast, Users, Megaphone, Download, LucideIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LazyVideoIframe } from "@/components/lazy-video-iframe"
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery"
import "./globals.css"
import "./styles/global.css"
import GuestChatbot from "./GuestChatbot"

// Types
export type MediaItem = {
    title: string
    type: "video" | "videolist"
    thumbnail: string
    icon: keyof typeof iconMap
    embedUrl: string | string[]
    description?: string
}

export type HighlightItem = {
    title: string
    fileId: string
}

export type ProfileData = {
    slug: string
    region?: "anz" | "usa"

    // Hero Section
    hero: {
        profileImage: string
        name: string
        tagline: string
    }

    // Media Section
    media: {
        sectionTitle: {
            primary: string
            secondary: string
        }
        description: string
        items: MediaItem[]
        highlights: HighlightItem[]
    }

    // Podcast Info Section
    podcastInfo: {
        whatIs: {
            title: {
                prefix: string
                highlight: string
            }
            description: string
        }
        getInvolved: {
            title: {
                prefix: string
                highlight: string
            }
            subtitle: string
            description: string
            links: {
                linkedIn: string
                shareStoryForm: string
            }
        }
        whyCyberWins: {
            title: {
                prefix: string
                highlight: string
            }
            paragraphs: string[]
            ctaText: string
            shareStoryForm: string
        }
    }
    
    host: string
    //transcript
    transcript: string

    // Footer
    footer: {
        text: string
        logoSrc: string
    }


}

type ProfilePageProps = {
    data: ProfileData
}

const iconMap = {
    PlayCircle,
    Mic,
    Video,
    Podcast,
    Users,
    Megaphone,
    Download,
}

// Unsplash stock images for highlight gallery cards
const highlightImages = [
    { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop&q=80", text: "cybersecurity concept with shield icon", by: "Adi Goldstein" },
    { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80", text: "server room with blue lights", by: "Taylor Vick" },
    { url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80", text: "matrix style digital rain", by: "Markus Spiske" },
    { url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&auto=format&fit=crop&q=80", text: "code on a laptop screen", by: "Luca Bravo" },
    { url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&auto=format&fit=crop&q=80", text: "programming code close-up", by: "Kevin Ku" },
    { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&auto=format&fit=crop&q=80", text: "network connections visualization", by: "Alina Grubnyak" },
    { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80", text: "digital earth from space", by: "NASA" },
    { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80", text: "circuit board macro", by: "Alexandre Debiève" },
    { url: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=900&auto=format&fit=crop&q=80", text: "hacker with binary code", by: "Nahel Abdul Hadi" },
    { url: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=900&auto=format&fit=crop&q=80", text: "laptop glowing in the dark", by: "Clément Hélardot" },
    { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&auto=format&fit=crop&q=80", text: "data center corridor", by: "Manuel Geissinger" },
    { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80", text: "hands typing on laptop", by: "John Schnobrich" },
    { url: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=900&auto=format&fit=crop&q=80", text: "abstract technology waves", by: "JJ Ying" },
    { url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&auto=format&fit=crop&q=80", text: "hand reaching through digital screen", by: "Gerold Hinzen" },
    { url: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=900&auto=format&fit=crop&q=80", text: "cloud computing concept", by: "Growtika" },
    { url: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=900&auto=format&fit=crop&q=80", text: "abstract digital technology", by: "Joshua Sortino" },
    { url: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=900&auto=format&fit=crop&q=80", text: "digital padlock security", by: "FlyD" },
    { url: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=900&auto=format&fit=crop&q=80", text: "cybersecurity padlock on keyboard", by: "Towfiqu barbhuiya" },
    { url: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=900&auto=format&fit=crop&q=80", text: "digital network globe", by: "Shubham Dhage" },
    { url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&auto=format&fit=crop&q=80", text: "neon lock icon", by: "Fly D" },
]

/** Maps highlight data to GalleryItem[] for the CircularGallery */
function buildGalleryItems(
    highlights: HighlightItem[],
    guestName: string,
): GalleryItem[] {
    return highlights.map((h, i) => ({
        common: h.title,
        binomial: `${guestName} Interview`,
        photo: {
            ...highlightImages[i % highlightImages.length],
            pos: "center",
        },
    }))
}

export function ProfilePage({ data }: ProfilePageProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<MediaItem | null>(null)

    const openModal = (item: MediaItem) => {
        setModalContent(item)
        setModalOpen(true)
    }

    const { hero, media, podcastInfo, footer, host, transcript } = data

    return (
        <div className="bg-[#FEFEFE] text-[#1A1A2E] font-light-body">
            <main>
                {/* Hero Section */}
                <section className="relative text-center min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-purple-50 to-pink-50 py-16 md:py-20 overflow-hidden">
                    {/* Smokey wave overlay effects - lighter and more subtle */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-pink-100/20 to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-100/40 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-pink-100/50 via-purple-50/30 to-transparent pointer-events-none"></div>

                    {/* Curved wave shape */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-bl from-pink-300/25 to-purple-200/15 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-20 px-6 flex flex-col items-center">
                        <div className="mb-8 md:mb-10">
                            <img
                                src={hero.profileImage}
                                alt={hero.name}
                                width={200}
                                height={200}
                                className="rounded-full border-4 border-[#FF6B35] shadow-2xl object-cover"
                            />
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 font-sans gradient-cyber-text">
                            {hero.name}
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-800 leading-relaxed px-4 font-medium ">
                            <span className="gradient-tagline font-semibold">
                                {hero.tagline}
                            </span>
                        </p>
                    </div>
                </section>

                {/* Media Content Section */}
                <section id="media" className="py-16 md:py-24 bg-[#FEFEFE]">
                    <div className="container mx-auto px-6 md:px-8">
                        <h2 className="text-4xl md:text-5xl text-center mb-8 md:mb-10 font-bold text-balance font-sans">
                            <span className="text-[#90027D]">{media.sectionTitle.primary}</span>{" "}
                            <span className="text-[#FF6B35]">{media.sectionTitle.secondary}</span>
                        </h2>

                        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                            <p className="text-left text-[#1A1A2E] text-base md:text-lg leading-relaxed px-4 font-normal font-roboto">
                                {media.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                            {media.items.map((item) => {
                                const Icon = iconMap[item.icon]

                                return (
                                    <div
                                        key={item.title}
                                        className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-white border-2 border-transparent hover:border-[#FF6B35] w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-md"
                                        onClick={() => openModal(item)}
                                    >
                                        <div className="aspect-video relative">
                                            <img
                                                src={item.thumbnail || "/placeholder.svg"}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-br from-[#90027D]/60 to-[#FF6B35]/40 group-hover:from-[#90027D]/80 group-hover:to-[#FF6B35]/60 transition-all duration-300 flex flex-col items-center justify-center p-4">
                                                {Icon && (
                                                    <Icon className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                                                )}

                                                <h3 className="mt-4 text-xl text-center text-white font-semibold font-sans drop-shadow-md">
                                                    {item.title}
                                                </h3>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section
                    id="cyber-wins-podcast"
                    className="py-20 md:py-28 bg-gradient-to-b from-purple-50/50 via-pink-50/30 to-orange-50/20"
                >
                    <div className="container mx-auto px-6 md:px-8">
                        <div className="max-w-5xl mx-auto space-y-16 md:space-y-20">
                            {/* What is Cyber Wins */}
                            <div className="bg-white rounded-2xl p-10 md:p-14 shadow-xl border-2 border-[#90027D]/30 hover:border-[#FF6B35]/50 transition-colors duration-300">
                                <div className="flex justify-center mb-8">
                                    <Podcast className="w-16 h-16 text-[#90027D]" />
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl text-center mb-6 font-bold text-balance font-sans">
                                    {podcastInfo.whatIs.title.prefix} <span className="gradient-cyber-text">{podcastInfo.whatIs.title.highlight}</span>?
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#90027D] via-[#C23BD4] to-[#FF6B35] mx-auto mb-10"></div>
                                <p className="text-left text-[#1A1A2E] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                                    {podcastInfo.whatIs.description}
                                </p>
                            </div>

                            {/* Get Involved */}
                            <div className="bg-white rounded-2xl p-10 md:p-14 shadow-xl border-2 border-[#C23BD4]/30 hover:border-[#FF6B35]/50 transition-colors duration-300">
                                <div className="flex justify-center mb-8">
                                    <Users className="w-16 h-16 text-[#FF6B35]" />
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl text-center mb-3 font-bold text-balance font-sans">
                                    {podcastInfo.getInvolved.title.prefix} <span className="text-[#FF6B35]">{podcastInfo.getInvolved.title.highlight}</span>
                                </h2>
                                <p className="text-center text-[#90027D] text-base md:text-lg font-medium mb-6 font-sans">
                                    {podcastInfo.getInvolved.subtitle}
                                </p>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B35] via-[#C23BD4] to-[#90027D] mx-auto mb-10"></div>
                                <div className="text-left text-[#1A1A2E] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto space-y-6">
                                    <p>{podcastInfo.getInvolved.description}</p>
                                    <ul className="list-disc list-inside space-y-3 ml-4">
                                        <li>
                                            <a
                                                href={podcastInfo.getInvolved.links.linkedIn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#90027D] font-bold hover:text-[#C23BD4] transition-colors"
                                            >
                                                Follow us on LinkedIn
                                            </a>{" "}
                                            : Stay connected with our latest episodes and cybersecurity insights.
                                        </li>
                                        <li>
                                            <a
                                                href={podcastInfo.getInvolved.links.shareStoryForm}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#90027D] font-bold hover:text-[#C23BD4] transition-colors"
                                            >
                                                Share Your Story
                                            </a>{" "}
                                            : Are you a leader with insights to share? We're always looking for inspiring guests. Reach out to
                                            be featured.
                                        </li>
                                        <li>
                                            <a
                                                href={podcastInfo.getInvolved.links.linkedIn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#C23BD4] font-bold hover:text-[#90027D] transition-colors"
                                            >
                                                Join Our Community
                                            </a>{" "}
                                            : Connect with like-minded professionals, share ideas, and grow your network.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Why Cyber Wins */}
                            <div className="bg-white rounded-2xl p-10 md:p-14 shadow-xl border-2 border-[#90027D]/30 hover:border-[#FF6B35]/50 transition-colors duration-300">
                                <div className="flex justify-center mb-8">
                                    <Megaphone className="w-16 h-16 text-[#FF6B35]" />
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl text-center mb-6 font-bold text-balance font-sans">
                                    {podcastInfo.whyCyberWins.title.prefix} <span className="gradient-cyber-text">{podcastInfo.whyCyberWins.title.highlight}</span>?
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#90027D] via-[#C23BD4] to-[#FF6B35] mx-auto mb-10"></div>
                                <div className="text-left text-[#1A1A2E] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto space-y-4">
                                    {podcastInfo.whyCyberWins.paragraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                    <p className="text-center font-bold text-2xl mt-8">
                                        <span className="gradient-cyber-text">{podcastInfo.whyCyberWins.ctaText}</span>
                                    </p>
                                    <div className="mt-10 pt-8 border-t-2 border-[#90027D]/20">
                                        <p className="text-center text-lg mb-6">
                                            <strong className="text-[#FF6B35]">Have a great story to share?</strong> Tell us about your cyber
                                            win and be featured on our podcast.
                                        </p>
                                        <div className="flex justify-center">
                                            <a
                                                href={podcastInfo.whyCyberWins.shareStoryForm}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block bg-gradient-to-r from-[#90027D] via-[#C23BD4] to-[#FF6B35] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                            >
                                                Share Your Story
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gradient-to-r from-[#90027D] via-[#C23BD4] to-[#FF6B35] text-center py-6">
                <div className="flex items-center justify-center gap-3">
                    <p className="text-white font-semibold text-base md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                        {footer.text}
                    </p>
                    {/* <img
                        src={footer.logoSrc}
                        alt="Cyber Wins"
                        width={40}
                        height={40}
                        className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                    /> */}
                </div>
            </footer>

            {modalContent && (
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className={`bg-white border-2 border-[#FF6B35] text-[#1A1A2E] ${modalContent.type === "videolist" ? "max-w-[95vw]" : "max-w-6xl"} w-full p-0 h-[95vh] overflow-y-auto`}>
                        <DialogHeader className="p-4 border-b-2 border-gradient-to-r from-[#90027D] to-[#FF6B35]">
                            <DialogTitle className="font-bold gradient-cyber-text font-sans">{modalContent.title}</DialogTitle>
                            {modalContent.description && (
                                <p className="text-[#1A1A2E] mt-2 leading-relaxed">{modalContent.description}</p>
                            )}
                        </DialogHeader>
                        <div className="p-1 md:p-2">
                            {modalContent.type === "video" && (
                                <LazyVideoIframe
                                    src={modalContent.embedUrl as string}
                                    title={modalContent.title}
                                    className="w-full aspect-video rounded-b-lg"
                                    poster={modalContent.thumbnail}
                                />
                            )}
                            {modalContent.type === "videolist" && (
                                <div className="flex flex-col h-[80vh]">
                                    {/* Circular Gallery */}
                                    <div className="flex-1 min-h-0 relative overflow-hidden">
                                        <CircularGallery
                                            items={buildGalleryItems(media.highlights, hero.name)}
                                            radius={Math.min(500, window.innerWidth * 0.35)}
                                            autoRotateSpeed={0.03}
                                            className="w-full h-full"
                                        />
                                    </div>

                                    {/* Download buttons row */}
                                    <div className="flex-shrink-0 border-t border-[#90027D]/20 p-4">
                                        <p className="text-center text-sm text-[#1A1A2E]/70 mb-3 font-sans">Download individual highlights</p>
                                        <div className="flex flex-wrap justify-center gap-2 max-h-[100px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#90027D]/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                                            {media.highlights.map((highlight, index) => (
                                                <a
                                                    key={highlight.fileId}
                                                    href={`https://drive.google.com/uc?export=download&id=${highlight.fileId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 bg-gradient-to-r from-[#90027D] to-[#FF6B35] text-white text-xs font-semibold py-1.5 px-3 rounded-full hover:opacity-90 transition-opacity"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Download className="w-3 h-3" />
                                                    {highlight.title}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            <GuestChatbot name={hero.name} host={host} transcriptPath={transcript}/>
        </div>
    )
}

// Export icons for use in data files
export { PlayCircle, Mic, Video }
