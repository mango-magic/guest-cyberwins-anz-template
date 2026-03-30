import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import sourceLogo from "@/assets/exclusive-logo-gradient.png";

interface TransparentLogoProps {
  className?: string;
  alt?: string;
}

// Removes light gray/white checkerboard backgrounds by keying out near-neutral light pixels
function removeCheckerboard(image: HTMLImageElement): string | null {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const w = image.naturalWidth;
    const h = image.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(image, 0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Thresholds tuned to remove common checkerboard grays and whites
    const neutralDelta = 14; // max channel difference to consider "gray/neutral"
    const lightMin = 180; // minimum brightness for background squares

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Skip already-transparent pixels
      if (a === 0) continue;

      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const isNeutral = maxC - minC <= neutralDelta;

      if (isNeutral && maxC >= lightMin) {
        // Key out light neutral pixels (checkerboard squares)
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL("image/png");
  } catch (e) {
    console.warn("Logo transparency processing failed:", e);
    return null;
  }
}

const TransparentLogo: React.FC<TransparentLogoProps> = ({ className, alt = "Exclusive Networks logo" }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => {
      const url = removeCheckerboard(img);
      setSrc(url || sourceLogo);
    };
    img.onerror = () => setSrc(sourceLogo);
    img.src = sourceLogo;
  }, []);

  return (
    <img
      src={src || sourceLogo}
      alt={alt}
      className={cn("select-none pointer-events-none", className)}
      loading="eager"
      decoding="async"
    />
  );
};

export default TransparentLogo;
