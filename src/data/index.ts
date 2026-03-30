/* eslint-disable @typescript-eslint/no-explicit-any */
const modules = import.meta.glob("./*.json", { eager: true });

export const profiles = Object.values(modules).map((mod: any) => mod.default);

export const profileMap = Object.fromEntries(
  profiles.map((p: any) => [p.slug, p])
);