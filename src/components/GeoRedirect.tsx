import { useEffect, useState } from "react";
import Guest from "./guest";
import AnzGuests from "./anz/guest";

type Region = "usa" | "anz" | null;

const GeoRedirect = () => {
  const [region, setRegion] = useState<Region>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const country = data.country;
        setRegion(country === "AU" || country === "NZ" ? "anz" : "usa");
      } catch {
        setRegion("usa"); // fallback to USA
      }
    };
    run();
  }, []);

  if (region === "anz") return <AnzGuests />;
  if (region === "usa") return <AnzGuests />;
  return null; // loading state — no flash
};

export default GeoRedirect;