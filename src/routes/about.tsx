import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import portrait from "@/assets/yulin-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — YULIN.zip" },
      { name: "description", content: "About YULIN, an AI video creator working in brand film, AI video, and visual storytelling." },
      { property: "og:title", content: "About — YULIN.zip" },
      { property: "og:description", content: "AI video creator. Brand film, music video, spec campaigns." },
      { property: "og:image", content: portrait },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <div className="relative panel overflow-hidden -rotate-2">
            <span className="tape -top-2 left-10 rotate-6" />
            <img src={portrait} alt="Portrait of YULIN" width={1024} height={1024} className="w-full aspect-square object-cover" />
            <div className="absolute bottom-3 right-3 sticker-pink">★ YULIN, 2026</div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="sticker text-center justify-center">Seoul ⇄ Remote</div>
            <div className="sticker-pink text-center justify-center">EST. 2020</div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="sticker mb-3">⊹ ABOUT.txt</div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            I direct <span className="text-chrome-pink">AI films</span> like a real crew.
          </h1>

          <div className="mt-6 space-y-4 font-body text-lg leading-relaxed">
            <p>
              Hi — I'm <strong>YULIN</strong>. I make video for brands, artists, and the
              speculative spaces between. My toolkit is generative, but my workflow is
              cinematic: treatments before prompts, style locks before frames, color
              science at the end.
            </p>
            <p>
              I started as a film editor cutting indie music videos in Seoul. When
              diffusion models broke open in 2022, I rebuilt my practice around them
              — not to replace a crew, but to give a one-person studio the reach of one.
            </p>
            <p>
              I'm most useful on projects that need a strong visual point of view,
              fast iteration, and a director who actually likes the unglamorous parts:
              the brief, the grade, the sound design pass at 2am.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <div className="panel p-5">
              <div className="font-mono uppercase text-sm text-muted-foreground">Services</div>
              <ul className="mt-2 space-y-1 font-body">
                <li>♥ Brand Films &amp; Anthem Spots</li>
                <li>♥ AI Music Videos</li>
                <li>♥ Spec Campaigns &amp; Pitch Films</li>
                <li>♥ Visual Systems &amp; Lookbooks</li>
              </ul>
            </div>
            <div className="panel p-5">
              <div className="font-mono uppercase text-sm text-muted-foreground">Toolkit</div>
              <ul className="mt-2 space-y-1 font-body">
                <li>★ Runway / Kling / Sora</li>
                <li>★ Midjourney / Flux / SDXL</li>
                <li>★ ComfyUI / Custom LoRAs</li>
                <li>★ Resolve / Premiere / AE</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/works" className="chrome-btn-pink">See the work →</Link>
            <Link to="/contact" className="chrome-btn">Work together ✉</Link>
          </div>
        </div>
      </section>

      {/* Press / Recognition */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="sticker mb-3">⊹ RECOGNITION</div>
        <h2 className="font-display text-4xl md:text-6xl">As seen / shown / shouted out</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            { y: "2025", t: "Seoul AI Film Showcase — Official Selection" },
            { y: "2025", t: "Feature, Korean Indie Mag, Issue 14" },
            { y: "2024", t: "Speaker, Visual AI Conference Tokyo" },
            { y: "2024", t: "AI Auteurs roundtable, IT'S NICE THAT" },
            { y: "2023", t: "Best Generative Short — Pixels Festival" },
            { y: "2023", t: "Resident, Seoul Generative Arts Lab" },
          ].map((r) => (
            <div key={r.t} className="panel p-4 flex gap-3 items-start">
              <span className="sticker-pink shrink-0">{r.y}</span>
              <p className="font-body">{r.t}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
