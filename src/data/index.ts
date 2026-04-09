/* eslint-disable @typescript-eslint/no-explicit-any */
const modules = import.meta.glob("./*.json", { eager: true });

export const profiles = Object.values(modules).map((mod: any) => mod.default);

export const profileMap: Record<string, any> = Object.fromEntries(
  profiles.map((p: any) => [p.slug, p])
);

/** Profiles that belong to a specific region (or have no region set) */
export function profilesByRegion(region: "anz" | "usa") {
  return profiles.filter(
    (p: any) => !p.region || p.region === region
  );
}