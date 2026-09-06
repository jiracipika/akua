// ============================================================
// AKUA — single source of truth for artist data.
//
// IDENTITY RULE: every piece of data below was pulled from
// Spotify artist ID 2FPrNTrNDOfuZCgYFBALI8 (official embed +
// oEmbed endpoints). There are multiple artists named "AKUA"
// online — nothing may be added here unless it is verifiably
// from THIS artist.
//
// To update later: edit this file only. Nothing else in the
// codebase hardcodes artist facts.
// ============================================================

export const artist = {
  name: "AKUA",
  spotifyArtistId: "2FPrNTrNDOfuZCgYFBALI8",
  spotifyUrl:
    "https://open.spotify.com/artist/2FPrNTrNDOfuZCgYFBALI8?si=fxlNd6pPQ4OoE3pf9SxY_A",
  spotifyEmbedUrl: "https://open.spotify.com/embed/artist/2FPrNTrNDOfuZCgYFBALI8?utm_source=website",
  // Verified: oEmbed + embed endpoints, image hash e470262b78c52f5da971b3e1
  portrait: "/akua-640.jpg",
  // No verified biography is published on the artist's Spotify profile.
  // Do NOT invent one. Add official copy here when it exists.
  bio: null as string | null,
  // Only verified socials go here. None are verifiable yet.
  socials: [] as { label: string; url: string }[],
  // Only add an email if the artist supplies one.
  contactEmail: null as string | null,
};

export type Track = {
  title: string;
  primary: string;
  featured?: string;
  duration: string;
  url: string;
  // deterministic art-direction token derived from the track itself
  tone: number; // 0..1 — drives per-track filter/treatment
};

// Verified top tracks — source: official Spotify embed for
// artist 2FPrNTrNDOfuZCgYFBALI8 (retrieved 2026-09-06).
// All links point at the canonical artist page.
export const topTracks: Track[] = [
  { title: "ALL FOR YOU", primary: "AKUA", featured: "Kelz John", duration: "2:51", url: artist.spotifyUrl, tone: 0.0 },
  { title: "YOU'RE NOT HER", primary: "AKUA", duration: "3:47", url: artist.spotifyUrl, tone: 0.2 },
  { title: "RTR", primary: "EAKUA", duration: "2:20", url: artist.spotifyUrl, tone: 0.35 },
  { title: "HEAVEN", primary: "EAKUA", duration: "2:48", url: artist.spotifyUrl, tone: 0.5 },
  { title: "SPACESHIP", primary: "AKUA", duration: "2:41", url: artist.spotifyUrl, tone: 0.65 },
  { title: "AIN'T LOYAL", primary: "AKUA", duration: "4:23", url: artist.spotifyUrl, tone: 0.8 },
  { title: "MS. SPRING", primary: "AKUA", featured: "Rai", duration: "3:02", url: artist.spotifyUrl, tone: 0.9 },
  { title: "SAD SOUL", primary: "AKUA", duration: "2:18", url: artist.spotifyUrl, tone: 0.1 },
  { title: "S P A C E . . .", primary: "AKUA", duration: "2:34", url: artist.spotifyUrl, tone: 0.45 },
  { title: "GOLDEN TRANS AM", primary: "AKUA", duration: "4:12", url: artist.spotifyUrl, tone: 0.7 },
];
