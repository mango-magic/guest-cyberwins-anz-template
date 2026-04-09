#!/usr/bin/env node

/**
 * new-episode.mjs — Interactive CLI to add a new guest episode.
 *
 * Usage:
 *   node scripts/new-episode.mjs
 *
 * It prompts for the guest-specific fields, auto-generates the slug,
 * writes src/data/<slug>.json and public/data/<slug>.txt (transcript placeholder),
 * then optionally commits and pushes so GitHub Pages redeploys.
 */

import { createInterface } from "node:readline/promises";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── helpers ────────────────────────────────────────────────────────────────

/** Turn "Jane O'Brien-Smith" into "jane-obrien-smith" */
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extract a Google Drive file ID from various URL formats:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/file/d/FILE_ID/preview
 *   https://drive.google.com/open?id=FILE_ID
 *   or a bare FILE_ID
 */
function extractDriveId(input) {
  input = input.trim();
  const match =
    input.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : input; // fall back to treating the whole string as an ID
}

function drivePreviewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// ── boilerplate shared across every profile ────────────────────────────────

const BOILERPLATE_PODCAST_INFO = {
  whatIs: {
    title: { prefix: "What is", highlight: "Cyber Wins" },
    description:
      "Cyber Wins is a cutting-edge podcast that brings you exclusive interviews with cybersecurity leaders, CISOs, and experts who are at the forefront of protecting organizations in today's digital landscape. Each episode dives deep into the strategies, insights, and real-world experiences behind defending against cyber threats, managing security risks, and building resilient security programs. From threat detection and incident response to security architecture and compliance frameworks, we cover the critical topics that matter most to cybersecurity professionals and organizations navigating the complex cyber space. Learn from those who have secured major enterprises and discover actionable knowledge to strengthen your own cybersecurity posture.",
  },
  getInvolved: {
    title: { prefix: "Get", highlight: "Involved" },
    subtitle: "Join the conversation and be part of the movement",
    description:
      "Ready to amplify your knowledge and connect with thought leaders? Here's how you can get involved with Cyber Wins:",
    links: {
      linkedIn:
        "https://www.linkedin.com/company/exclusive-networks-podcast-series/posts/?feedView=all",
      shareStoryForm: "https://forms.gle/4QZVeeSwfB6BURG77",
    },
  },
  whyCyberWins: {
    title: { prefix: "Why", highlight: "Cyber Wins" },
    paragraphs: [
      "In a rapidly evolving digital landscape, staying informed isn't just an advantage\u2014it's essential. Cyber Wins delivers the insights, strategies, and inspiration you need to win in your field.",
      "Whether you're an entrepreneur, executive, or innovator, our podcast provides the competitive edge to help you make smarter decisions, build stronger networks, and drive meaningful impact. Don't just keep up with change\u2014lead it.",
    ],
    ctaText: "Ready to score your next win? Let\u2019s connect.",
    shareStoryForm: "https://forms.gle/4QZVeeSwfB6BURG77",
  },
};

// ── interactive prompts ────────────────────────────────────────────────────

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const ask = (q) => rl.question(`\x1b[36m${q}\x1b[0m `);
  const required = async (q) => {
    let ans = "";
    while (!ans) ans = (await ask(q)).trim();
    return ans;
  };

  console.log("\n\x1b[1m=== New CyberWins Episode ===\x1b[0m\n");

  // ── 1. Guest info ──
  const name = await required("Guest full name:");
  const slug = toSlug(name);
  console.log(`  → slug: \x1b[33m${slug}\x1b[0m`);

  // Check for duplicates
  const dataPath = join(ROOT, "src", "data", `${slug}.json`);
  if (existsSync(dataPath)) {
    console.error(`\x1b[31mError: ${dataPath} already exists.\x1b[0m`);
    rl.close();
    process.exit(1);
  }

  const region = (
    await required("Region (anz / usa):")
  ).toLowerCase();
  if (region !== "anz" && region !== "usa") {
    console.error(`\x1b[31mRegion must be "anz" or "usa".\x1b[0m`);
    rl.close();
    process.exit(1);
  }

  const tagline = await required("Tagline (title + key achievement):");
  const description = await required("Episode description / synopsis:");

  // ── 2. Profile image ──
  const profileImageInput = await required(
    "Profile image filename (e.g. Jane-Smith-Profile.jpg):"
  );
  const profileImage = `/images/${profileImageInput.replace(/^\/images\//, "")}`;

  // ── 3. Videos ──
  console.log(
    "\n\x1b[2mPaste Google Drive share links or file IDs.\x1b[0m\n"
  );

  const fullInterviewUrl = await required("Full interview video URL/ID:");
  const fullInterviewId = extractDriveId(fullInterviewUrl);

  const introUrl = await required("Speaker introduction video URL/ID:");
  const introId = extractDriveId(introUrl);

  // ── 4. Highlights ──
  console.log(
    '\n\x1b[2mEnter highlight clip URLs/IDs one per line. Press Enter on empty line when done.\x1b[0m\n'
  );
  const highlightIds = [];
  let idx = 1;
  while (true) {
    const line = (await ask(`  Highlight ${idx}:`)).trim();
    if (!line) break;
    highlightIds.push(extractDriveId(line));
    idx++;
  }

  if (highlightIds.length === 0) {
    console.log("\x1b[33mNo highlights entered — skipping videolist.\x1b[0m");
  }

  // ── 5. Transcript ──
  const transcriptFile = `/data/${slug}.txt`;

  // ── 6. Build the JSON ──
  const mediaItems = [
    {
      title: "Full Interview",
      type: "video",
      thumbnail: "/images/full-interview-thumbnail.png",
      icon: "PlayCircle",
      embedUrl: drivePreviewUrl(fullInterviewId),
      description: `Interview with ${name}`,
    },
    {
      title: "Speaker Introduction",
      type: "video",
      thumbnail: "/images/introduction-thumbnail.png",
      icon: "Mic",
      embedUrl: drivePreviewUrl(introId),
      description: `Introduction to ${name}`,
    },
  ];

  if (highlightIds.length > 0) {
    mediaItems.push({
      title: "Interview Highlights",
      type: "videolist",
      thumbnail: "/images/highlights-thumbnail.png",
      icon: "Video",
      embedUrl: highlightIds.map(drivePreviewUrl),
      description: `Key moments and insights from the interview with ${name}`,
    });
  }

  const highlights = highlightIds.map((id, i) => ({
    title: `Highlight ${i + 1}`,
    fileId: id,
  }));

  const profile = {
    slug,
    region,
    hero: {
      profileImage,
      name,
      tagline,
    },
    media: {
      sectionTitle: { primary: "Cyber", secondary: "Wins" },
      description,
      items: mediaItems,
      highlights,
    },
    podcastInfo: BOILERPLATE_PODCAST_INFO,
    host: "Mark Voorhies",
    transcript: transcriptFile,
    footer: {
      text: "Cyber Wins Podcast \u00A9 2026",
      logoSrc: "/images/cyber-wins-logo.png",
    },
  };

  // ── 7. Write files ──
  const jsonStr = JSON.stringify(profile, null, 2) + "\n";
  writeFileSync(dataPath, jsonStr, "utf-8");
  console.log(`\n\x1b[32m✓ Created ${dataPath}\x1b[0m`);

  // Transcript placeholder
  const transcriptPath = join(ROOT, "public", "data", `${slug}.txt`);
  mkdirSync(dirname(transcriptPath), { recursive: true });
  if (!existsSync(transcriptPath)) {
    writeFileSync(transcriptPath, `Transcript for ${name}\n\n(paste full transcript here)\n`, "utf-8");
    console.log(`\x1b[32m✓ Created ${transcriptPath}\x1b[0m`);
  }

  // Reminder about profile image
  console.log(
    `\n\x1b[33m⚠  Remember to add the profile image to public/images/\x1b[0m`
  );
  console.log(`   Expected path: public${profileImage}`);

  // ── 8. Optional commit + push ──
  const commitAnswer = (await ask("\nCommit and push? (y/N):")).trim().toLowerCase();

  if (commitAnswer === "y" || commitAnswer === "yes") {
    try {
      execSync(`git add "${dataPath}" "${transcriptPath}"`, { cwd: ROOT, stdio: "inherit" });
      const commitMsg = `Add new episode: ${name} (${region.toUpperCase()})`;
      execSync(`git commit -m "${commitMsg}"`, { cwd: ROOT, stdio: "inherit" });
      execSync(`git push -u origin main`, { cwd: ROOT, stdio: "inherit" });
      console.log(
        `\n\x1b[32m✓ Pushed to main — GitHub Pages will redeploy.\x1b[0m`
      );
      console.log(
        `  Episode URL: \x1b[4mhttps://ep.cyber-wins.com/${region}/${slug}\x1b[0m\n`
      );
    } catch (e) {
      console.error(`\x1b[31mGit failed: ${e.message}\x1b[0m`);
    }
  } else {
    console.log(
      `\nEpisode URL (after deploy): \x1b[4mhttps://ep.cyber-wins.com/${region}/${slug}\x1b[0m\n`
    );
  }

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
