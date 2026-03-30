import { useEffect } from "react";

const FaviconManager = () => {
  useEffect(() => {
    const setFavicon = (href: string) => {
      const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (favicon) favicon.href = href;
    };

    const run = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const country = data.country;

        if (country === "AU" || country === "NZ") {
          setFavicon("https://pub-a2a1c741d75e42a1bfe46a442182bfed.r2.dev/c3f6eddd-72e9-46e0-872e-26ac824dac38/c84d9524-47c5-4d32-950d-b12d043a793b.png");
        } else {
          setFavicon("https://pub-a2a1c741d75e42a1bfe46a442182bfed.r2.dev/c3f6eddd-72e9-46e0-872e-26ac824dac38/1ad3d095-2d17-43d0-91da-e1891e97a7ef.png");
        }
      } catch {
        setFavicon("https://pub-a2a1c741d75e42a1bfe46a442182bfed.r2.dev/c3f6eddd-72e9-46e0-872e-26ac824dac38/1ad3d095-2d17-43d0-91da-e1891e97a7ef.png"); // fallback to USA
      }
    };

    run();
  }, []); // runs once on mount

  return null;
};

export default FaviconManager;