import { createFileRoute, Link } from "@tanstack/react-router";
import { Marquee, PageShell } from "@/components/Layout";
import { featuredWorks as works } from "@/lib/works";
import chromeBg from "@/assets/chrome-bg.jpg";
import portrait from "@/assets/yulin-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YULIN.zip — AI Video Creator" },
      { name: "description", content: "Portfolio of YULIN — AI video creator working in brand film, AI video, and visual storytelling." },
      { property: "og:title", content: "YULIN.zip — AI Video Creator" },
      { property: "og:description", content: "Brand Film / AI Video / Visual Storytelling" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-foreground">
        <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: `url(${chromeBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="sticker-pink">★ NOW BOOKING 2026</span>
              <span className="sticker">♥ Seoul / Remote</span>
              <span className="sticker">VOL.01</span>
            </div>
            <h1 className="font-display text-[18vw] md:text-[10rem] leading-[0.85] tracking-tight">
              <span className="text-chrome-pink block">YULIN</span>
              <span className="text-chrome block">.zip</span>
            </h1>
            <p className="mt-6 font-display text-2xl md:text-4xl">AI VIDEO CREATOR</p>
            <p className="mt-2 font-mono text-xl md:text-2xl text-muted-foreground">
              Brand Film <span className="text-primary">/</span> AI Video <span className="text-primary">/</span> Visual Storytelling
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/works" className="chrome-btn-pink">▶ Watch Selected Works</Link>
              <Link to="/contact" className="chrome-btn">✦ Start a Project</Link>
            </div>
          </div>

          <div className="md:col-span-4 relative">
            <div className="relative panel overflow-hidden rotate-2">
              <span className="tape -top-2 left-6 -rotate-6" />
              <img src={portrait} alt="Portrait of YULIN" width={800} height={800} className="w-full aspect-square object-cover" />
              <div className="absolute bottom-3 left-3 sticker-pink">@YULIN.zip</div>
            </div>
            <div className="absolute -top-6 -right-4 grid h-24 w-24 place-items-center rounded-full border-2 border-foreground bg-primary text-white font-display text-center text-sm leading-tight animate-spin-slow shadow-[2px_2px_0_var(--ink)]">
              NEW<br />REEL<br />★ 2026
            </div>
          </div>
        </div>
      </section>

      <Marquee items={["YULIN.ZIP", "AI VIDEO", "BRAND FILM", "VISUAL STORY", "SEOUL", "★", "NOW BOOKING"]} />

      {/* WHAT I MAKE */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-4">
        <div className="sticker mb-3">⊹ CATEGORIES</div>
        <h2 className="font-display text-4xl md:text-6xl">What I make</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { t: "AI Brand Film", d: "Anthem spots, launch films, brand storytelling." , i: "▶" },
            { t: "Music Video", d: "Dream logic for indie artists & labels." , i: "♪" },
            { t: "Animation", d: "Loop sets, motion ID, animated key art." , i: "✦" },
            { t: "Fashion Visual", d: "Editorial film, lookbooks, spec campaigns." , i: "♥" },
            { t: "Experimental", d: "Personal shorts & R&D — where the new looks happen." , i: "★" },
          ].map((c, idx) => (
            <Link
              key={c.t}
              to="/works"
              className="panel p-4 hover:-translate-y-1 transition-transform block"
              style={{ transform: `rotate(${(idx % 2 === 0 ? -0.5 : 0.5)}deg)` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-foreground bg-primary text-white font-display">{c.i}</span>
                <span className="font-mono uppercase text-xs text-muted-foreground">0{idx + 1}</span>
              </div>
              <div className="font-display text-xl leading-tight">{c.t}</div>
              <p className="mt-1 font-body text-sm text-muted-foreground">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20">

        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <div className="sticker mb-3">⊹ 01 / SELECTED WORKS</div>
            <h2 className="font-display text-5xl md:text-7xl">Selected <span className="text-chrome-pink">Works</span></h2>
          </div>
          <Link to="/works" className="chrome-btn text-sm">See all →</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {works.map((w, i) => (
            <Link
              key={w.slug}
              to="/works/$slug"
              params={{ slug: w.slug }}
              className="group relative panel overflow-hidden block transition-transform hover:-translate-y-1"
              style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-foreground bg-foreground">
                <img src={w.thumb} alt={w.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 sticker-pink">▶ Play Reel</span>
                <span className="absolute top-3 right-3 sticker">{w.year}</span>
              </div>
              <div className="p-5">
                <div className="font-mono text-sm uppercase text-muted-foreground">{w.category}</div>
                <h3 className="font-display text-3xl mt-1">{w.title}</h3>
                {w.subtitle && <div className="font-serif italic text-lg text-muted-foreground">{w.subtitle}</div>}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => (
                    <span key={t} className="font-mono text-sm px-2 py-0.5 border border-foreground rounded-full">#{t}</span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 font-mono uppercase text-sm group-hover:text-primary">
                  View case study →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y-2 border-foreground bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="sticker-pink mb-3">⊹ 02 / CREATIVE PROCESS</div>
          <h2 className="font-display text-5xl md:text-7xl text-background">How it gets made</h2>
          <p className="mt-3 font-mono text-xl opacity-70 max-w-2xl">
            I treat AI like a film crew — not a vending machine. Every piece moves through four stages.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Brief & Mood", d: "Treatment, references, written intent. The hardest part — and the part most people skip." },
              { n: "02", t: "Pre-Viz", d: "Stills, style locks, character LoRAs. Establish the visual grammar before any frame moves." },
              { n: "03", t: "Generate & Direct", d: "Runway, Kling, ComfyUI — chosen per shot, not per habit. I direct, the models render." },
              { n: "04", t: "Post & Finish", d: "Grade, sound design, finishing pass. The 20% that makes it feel commissioned." },
            ].map((s) => (
              <div key={s.n} className="relative panel bg-background text-foreground p-5">
                <div className="font-display text-5xl text-primary">{s.n}</div>
                <h3 className="font-display text-2xl mt-2">{s.t}</h3>
                <p className="font-body text-base mt-2 text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="sticker mb-3">⊹ 03 / ABOUT</div>
          <h2 className="font-display text-5xl md:text-7xl">Hi, I'm <span className="text-chrome-pink">YULIN</span></h2>
          <p className="mt-4 font-body text-lg leading-relaxed">
            I'm an AI video creator working between Seoul and the rest of the internet.
            I build brand films, music videos, and speculative campaigns using generative tools
            — directed with the same rigor as a traditional production.
          </p>
          <p className="mt-3 font-body text-lg leading-relaxed text-muted-foreground">
            My background is in film editing. My present is in prompts, LoRAs, and
            color science. My obsession is making AI work that feels made, not generated.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/about" className="chrome-btn">More about me →</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "Projects shipped", v: "40+" },
            { k: "Years in motion", v: "06" },
            { k: "Brands worked with", v: "12" },
            { k: "Coffees per edit", v: "∞" },
          ].map((s) => (
            <div key={s.k} className="panel p-5">
              <div className="font-display text-5xl text-chrome-pink">{s.v}</div>
              <div className="font-mono uppercase text-sm mt-1">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="relative panel p-10 md:p-16 text-center overflow-hidden">
          <span className="tape -top-2 left-10 -rotate-3" />
          <span className="tape -top-2 right-10 rotate-6" />
          <div className="sticker-pink mx-auto mb-4">⊹ 04 / CONTACT</div>
          <h2 className="font-display text-5xl md:text-8xl leading-none">
            Got an idea? <br /><span className="text-chrome-pink">Let's ship it.</span>
          </h2>
          <p className="mt-4 font-mono text-xl text-muted-foreground">Currently booking brand films &amp; campaigns for Spring 2026.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@yulin.zip" className="chrome-btn-pink">✉ hello@yulin.zip</a>
            <Link to="/contact" className="chrome-btn">Open contact form →</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
