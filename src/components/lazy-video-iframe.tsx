"use client"

import { useEffect, useRef, useState } from "react"

interface LazyVideoIframeProps {
  src: string
  title: string
  className?: string
  poster?: string
}

export function LazyVideoIframe({ src, title, className = "", poster }: LazyVideoIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // When iframe is triggered, set a timeout: if it hasn't visually loaded
  // (we can't reliably detect iframe load errors cross-origin), at least
  // collapse the empty white gap by keeping the poster visible as fallback.
  const showIframe = isVisible && (hasInteracted || !poster) && !iframeError

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-gradient-to-br from-[#90027D]/5 to-[#FF6B35]/5 ${className}`}>
      {/* Poster/Thumbnail state - shown before click or as fallback */}
      {!hasInteracted && poster && (
        <div className="absolute inset-0 cursor-pointer z-10" onClick={() => setHasInteracted(true)}>
          <img
            src={poster || "/placeholder.svg"}
            alt={title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          />

          <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />

          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-[#90027D] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {showIframe && (
        <iframe
          src={src}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
          loading="lazy"
          onError={() => setIframeError(true)}
        />
      )}

      {/* Fallback when iframe fails or hasn't loaded yet after interaction */}
      {hasInteracted && !poster && !showIframe && (
        <div className="absolute inset-0 flex items-center justify-center text-[#90027D]/60">
          <p className="text-sm font-sans">Video unavailable</p>
        </div>
      )}
    </div>
  )
}
