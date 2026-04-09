import React, { useState, useCallback } from "react"
import { Plus, Trash2, Upload, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, ExternalLink } from "lucide-react"

const REPO_OWNER = "mango-magic"
const REPO_NAME = "guest-cyberwins-anz-template"
const BRANCH = "main"

// ── helpers ─────────────────────────────────────────────────────────────

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function extractDriveId(input: string) {
  input = input.trim()
  const match =
    input.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    input.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  return match ? match[1] : input
}

function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

// ── boilerplate ─────────────────────────────────────────────────────────

const BOILERPLATE_PODCAST_INFO = {
  whatIs: {
    title: { prefix: "What is", highlight: "Cyber Wins" },
    description:
      "Cyber Wins is a cutting-edge podcast that brings you exclusive interviews with cybersecurity leaders, CISOs, and experts who are at the forefront of protecting organizations in today\u2019s digital landscape. Each episode dives deep into the strategies, insights, and real-world experiences behind defending against cyber threats, managing security risks, and building resilient security programs. From threat detection and incident response to security architecture and compliance frameworks, we cover the critical topics that matter most to cybersecurity professionals and organizations navigating the complex cyber space. Learn from those who have secured major enterprises and discover actionable knowledge to strengthen your own cybersecurity posture.",
  },
  getInvolved: {
    title: { prefix: "Get", highlight: "Involved" },
    subtitle: "Join the conversation and be part of the movement",
    description:
      "Ready to amplify your knowledge and connect with thought leaders? Here\u2019s how you can get involved with Cyber Wins:",
    links: {
      linkedIn:
        "https://www.linkedin.com/company/exclusive-networks-podcast-series/posts/?feedView=all",
      shareStoryForm: "https://forms.gle/4QZVeeSwfB6BURG77",
    },
  },
  whyCyberWins: {
    title: { prefix: "Why", highlight: "Cyber Wins" },
    paragraphs: [
      "In a rapidly evolving digital landscape, staying informed isn\u2019t just an advantage\u2014it\u2019s essential. Cyber Wins delivers the insights, strategies, and inspiration you need to win in your field.",
      "Whether you\u2019re an entrepreneur, executive, or innovator, our podcast provides the competitive edge to help you make smarter decisions, build stronger networks, and drive meaningful impact. Don\u2019t just keep up with change\u2014lead it.",
    ],
    ctaText: "Ready to score your next win? Let\u2019s connect.",
    shareStoryForm: "https://forms.gle/4QZVeeSwfB6BURG77",
  },
}

// ── GitHub API ──────────────────────────────────────────────────────────

async function githubApi(
  token: string,
  endpoint: string,
  method = "GET",
  body?: unknown
) {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API ${res.status}`)
  }
  return res.json()
}

async function commitFiles(
  token: string,
  files: { path: string; content: string }[],
  message: string
) {
  // 1. Get current ref
  const ref = await githubApi(token, `/git/ref/heads/${BRANCH}`)
  const latestSha = ref.object.sha

  // 2. Get current commit tree
  const commit = await githubApi(token, `/git/commits/${latestSha}`)
  const treeSha = commit.tree.sha

  // 3. Create blobs
  const blobs = await Promise.all(
    files.map((f) =>
      githubApi(token, "/git/blobs", "POST", {
        content: f.content,
        encoding: "utf-8",
      })
    )
  )

  // 4. Create new tree
  const tree = await githubApi(token, "/git/trees", "POST", {
    base_tree: treeSha,
    tree: files.map((f, i) => ({
      path: f.path,
      mode: "100644",
      type: "blob",
      sha: blobs[i].sha,
    })),
  })

  // 5. Create commit
  const newCommit = await githubApi(token, "/git/commits", "POST", {
    message,
    tree: tree.sha,
    parents: [latestSha],
  })

  // 6. Update ref
  await githubApi(token, `/git/refs/heads/${BRANCH}`, "PATCH", {
    sha: newCommit.sha,
  })

  return newCommit
}

// ── component ───────────────────────────────────────────────────────────

type Status = "idle" | "submitting" | "success" | "error"

export default function Admin() {
  // Auth
  const [token, setToken] = useState(() => localStorage.getItem("gh_token") || "")
  const [showToken, setShowToken] = useState(false)

  // Form
  const [name, setName] = useState("")
  const [region, setRegion] = useState<"anz" | "usa">("anz")
  const [tagline, setTagline] = useState("")
  const [description, setDescription] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [fullInterviewUrl, setFullInterviewUrl] = useState("")
  const [introUrl, setIntroUrl] = useState("")
  const [highlights, setHighlights] = useState<string[]>([""])
  const [transcript, setTranscript] = useState("")

  // Status
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [createdSlug, setCreatedSlug] = useState("")

  const slug = toSlug(name)

  const saveToken = useCallback((val: string) => {
    setToken(val)
    localStorage.setItem("gh_token", val)
  }, [])

  const addHighlight = () => setHighlights((h) => [...h, ""])
  const removeHighlight = (i: number) =>
    setHighlights((h) => h.filter((_, idx) => idx !== i))
  const updateHighlight = (i: number, val: string) =>
    setHighlights((h) => h.map((v, idx) => (idx === i ? val : v)))

  const isValid =
    token && name && tagline && description && fullInterviewUrl && introUrl

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setStatus("submitting")
    setErrorMsg("")

    try {
      const fullInterviewId = extractDriveId(fullInterviewUrl)
      const introId = extractDriveId(introUrl)
      const highlightIds = highlights
        .map((h) => h.trim())
        .filter(Boolean)
        .map(extractDriveId)

      const mediaItems: unknown[] = [
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
      ]

      if (highlightIds.length > 0) {
        mediaItems.push({
          title: "Interview Highlights",
          type: "videolist",
          thumbnail: "/images/highlights-thumbnail.png",
          icon: "Video",
          embedUrl: highlightIds.map(drivePreviewUrl),
          description: `Key moments and insights from the interview with ${name}`,
        })
      }

      const highlightItems = highlightIds.map((id, i) => ({
        title: `Highlight ${i + 1}`,
        fileId: id,
      }))

      const imageFilename = profileImage.trim() || "placeholder.svg"
      const imagePath = imageFilename.startsWith("/images/")
        ? imageFilename
        : `/images/${imageFilename}`

      const profile = {
        slug,
        region,
        hero: { profileImage: imagePath, name, tagline },
        media: {
          sectionTitle: { primary: "Cyber", secondary: "Wins" },
          description,
          items: mediaItems,
          highlights: highlightItems,
        },
        podcastInfo: BOILERPLATE_PODCAST_INFO,
        host: "Mark Voorhies",
        transcript: `/data/${slug}.txt`,
        footer: {
          text: "Cyber Wins Podcast \u00a9 2026",
          logoSrc: "/images/cyber-wins-logo.png",
        },
      }

      const transcriptContent =
        transcript.trim() || `Transcript for ${name}\n\n(paste full transcript here)`

      await commitFiles(
        token,
        [
          {
            path: `src/data/${slug}.json`,
            content: JSON.stringify(profile, null, 2) + "\n",
          },
          {
            path: `public/data/${slug}.txt`,
            content: transcriptContent + "\n",
          },
        ],
        `Add new episode: ${name} (${region.toUpperCase()})`
      )

      setCreatedSlug(slug)
      setStatus("success")
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error")
      setStatus("error")
    }
  }

  const resetForm = () => {
    setName("")
    setTagline("")
    setDescription("")
    setProfileImage("")
    setFullInterviewUrl("")
    setIntroUrl("")
    setHighlights([""])
    setTranscript("")
    setStatus("idle")
    setCreatedSlug("")
    setErrorMsg("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#16132B] to-[#0F0D1A]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-sans">
              <span className="text-[#90027D]">Cyber</span>
              <span className="text-[#FF6B35]">Wins</span>
              <span className="text-white/50 font-normal ml-3 text-lg">Episode Upload</span>
            </h1>
          </div>
          <a
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors font-sans"
          >
            Back to site
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-3xl">
        {/* Token setup */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-5">
          <label className="block text-sm font-medium text-white/70 mb-2 font-sans">
            GitHub Personal Access Token
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showToken ? "text" : "password"}
                value={token}
                onChange={(e) => saveToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="text-xs text-white/30 mt-2">
            Needs <code className="text-[#FF6B35]/60">repo</code> scope.
            Stored locally in your browser only.
          </p>
        </div>

        {/* Success state */}
        {status === "success" && (
          <div className="mb-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-white font-sans mb-2">Episode Published</h2>
            <p className="text-white/60 mb-4 text-sm">
              Deploy will start automatically. The page will be live in ~2 minutes.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={`https://ep.cyber-wins.com/${region}/${createdSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#90027D] to-[#FF6B35] text-white text-sm font-semibold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity"
              >
                View Episode <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={resetForm}
                className="text-sm text-white/50 hover:text-white/80 transition-colors py-2.5 px-5 border border-white/10 rounded-lg"
              >
                Add Another
              </button>
            </div>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 text-sm font-medium">Upload failed</p>
              <p className="text-red-300/70 text-xs mt-1">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Form */}
        {status !== "success" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Info */}
            <fieldset className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <legend className="text-sm font-semibold text-[#FF6B35] px-2 font-sans">
                Guest Information
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm"
                  />
                  {slug && (
                    <p className="text-xs text-white/30 mt-1">
                      Slug: <code className="text-[#C23BD4]">{slug}</code>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Region *</label>
                  <div className="flex rounded-lg overflow-hidden border border-white/10">
                    {(["anz", "usa"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRegion(r)}
                        className={`flex-1 py-2.5 text-sm font-semibold font-sans transition-colors ${
                          region === r
                            ? "bg-gradient-to-r from-[#90027D] to-[#FF6B35] text-white"
                            : "bg-white/5 text-white/40 hover:text-white/60"
                        }`}
                      >
                        {r.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Tagline *
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="CISO at Acme Corp | Zero trust across multi-cloud environments"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Episode Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A detailed synopsis of the episode..."
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Profile Image Filename
                </label>
                <input
                  type="text"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  placeholder="Jane-Smith-Profile.jpg (must be uploaded to /images/ separately)"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm"
                />
              </div>
            </fieldset>

            {/* Video Links */}
            <fieldset className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <legend className="text-sm font-semibold text-[#FF6B35] px-2 font-sans">
                Video Links
              </legend>
              <p className="text-xs text-white/30 -mt-2">
                Paste Google Drive share URLs or bare file IDs
              </p>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Full Interview *
                </label>
                <input
                  type="text"
                  value={fullInterviewUrl}
                  onChange={(e) => setFullInterviewUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Speaker Introduction *
                </label>
                <input
                  type="text"
                  value={introUrl}
                  onChange={(e) => setIntroUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm font-mono"
                />
              </div>
            </fieldset>

            {/* Highlights */}
            <fieldset className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <legend className="text-sm font-semibold text-[#FF6B35] px-2 font-sans">
                Highlight Clips
              </legend>

              <div className="space-y-2">
                {highlights.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="flex items-center justify-center w-8 h-10 rounded-lg bg-gradient-to-br from-[#90027D] to-[#FF6B35] text-white text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => updateHighlight(i, e.target.value)}
                      placeholder="Google Drive URL or file ID"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm font-mono"
                    />
                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(i)}
                        className="p-2 text-white/20 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addHighlight}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add highlight
              </button>
            </fieldset>

            {/* Transcript */}
            <fieldset className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <legend className="text-sm font-semibold text-[#FF6B35] px-2 font-sans">
                Transcript
              </legend>

              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste the full interview transcript here (optional — can be added later)"
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 text-sm resize-none"
              />
            </fieldset>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || status === "submitting"}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#90027D] via-[#C23BD4] to-[#FF6B35] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-base font-sans"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" /> Publish Episode
                </>
              )}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
