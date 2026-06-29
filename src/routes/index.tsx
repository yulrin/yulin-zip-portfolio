import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/Layout";
import { featuredWorks as works, works as allWorks, CATEGORIES } from "@/lib/works";


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

function WindowFrame({
  title,
  variant = "pink",
  className = "",
  children,
  status,
}: {
  title: string;
  variant?: "pink" | "silver";
  className?: string;
  children: React.ReactNode;
  status?: string;
}) {
  return (
    <div className={`win ${className}`}>
      <div className={variant === "pink" ? "win-bar" : "win-bar-silver"}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="win-dot">▣</span>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="win-dot">_</span>
          <span className="win-dot">▢</span>
          <span className="win-dot">×</span>
        </div>
      </div>
      {children}
      {status && (
        <div className="px-3 py-1 border-t-2 border-foreground bg-muted font-mono text-sm flex items-center justify-between">
          <span>{status}</span>
          <span className="blink">▮</span>
        </div>
      )}
    </div>
  );
}

const CATEGORY_META: Record<string, { icon: string; size: string }> = {
  "AI Brand Film": { icon: "▶", size: "12 items" },
  "Music Video":   { icon: "♪", size: "08 items" },
  "Animation":     { icon: "✦", size: "06 items" },
  "Fashion Visual":{ icon: "♥", size: "09 items" },
  "Experimental":  { icon: "★", size: "05 items" },
};

function useClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(d.toTimeString().slice(0, 8));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const SHOWREEL_CLIPS = [
  { slug: "midnight-railway-diner", label: "철길심야식당", tag: "EXPERIMENTAL", t: "00:00" },
  { slug: "sodeung",                label: "SODEUNG",      tag: "MUSIC VIDEO",  t: "00:32" },
  { slug: "post-apocalypse-paris",  label: "POST-APOCALYPSE PARIS", tag: "FASHION", t: "01:08" },
  { slug: "arcade-heart",           label: "ARCADE HEART", tag: "MUSIC VIDEO",  t: "01:44" },
  { slug: "chrome-flora",           label: "CHROME FLORA", tag: "ANIMATION",    t: "02:21" },
] as const;

const SHOWREEL_TOTAL_SEC = 168; // 02:48

function pad(n: number) { return n.toString().padStart(2, "0"); }
function fmtTime(s: number) { return `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`; }

function ShowreelPlayer() {
  const clips = useMemo(() => {
    return SHOWREEL_CLIPS.map((c) => {
      const w = allWorks.find((x) => x.slug === c.slug);
      return { ...c, thumb: w?.thumb ?? "", year: w?.year ?? "" };
    });
  }, []);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        if (next >= SHOWREEL_TOTAL_SEC) {
          setIdx((i) => (i + 1) % clips.length);
          return 0;
        }
        // advance idx based on timestamps
        const tToSec = (t: string) => {
          const [m, s] = t.split(":").map(Number);
          return m * 60 + s;
        };
        const newIdx = clips.reduce((acc, c, i) => (tToSec(c.t) <= next ? i : acc), 0);
        setIdx(newIdx);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, clips]);

  const current = clips[idx];
  const progress = (elapsed / SHOWREEL_TOTAL_SEC) * 100;

  return (
    <WindowFrame title="SHOWREEL_2026.MP4" variant="silver">
      <div className="bg-foreground">
        {/* Video area */}
        <div className="relative aspect-square overflow-hidden">
          {clips.map((c, i) => (
            <img
              key={c.slug}
              src={c.thumb}
              alt={c.label}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px)" }}
            aria-hidden
          />
          {/* Top labels */}
          <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
            <div className="sticker-pink text-xs">▶ NOW PLAYING</div>
            <div className="sticker text-[10px]">● REC · HD</div>
          </div>
          {/* Center play button */}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause showreel" : "Play showreel"}
            className="absolute inset-0 grid place-items-center group"
          >
            <span className="grid place-items-center w-16 h-16 rounded-full border-2 border-foreground bg-white/90 group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-display text-2xl shadow-[2px_2px_0_var(--ink)]">
              {playing ? "❚❚" : "▶"}
            </span>
          </button>
          {/* Bottom title strip */}
          <div className="absolute bottom-0 inset-x-0 bg-foreground/85 text-background px-3 py-2 font-mono text-xs flex items-center justify-between gap-2">
            <span className="truncate"><span className="text-chrome-pink">▶</span> {current.label}</span>
            <span className="opacity-70 shrink-0">{current.tag} · {current.year}</span>
          </div>
        </div>

        {/* Transport / progress */}
        <div className="bg-white px-3 py-2 border-t-2 border-foreground">
          {/* Progress bar */}
          <div
            className="relative h-3 border-2 border-foreground bg-muted rounded-sm overflow-hidden cursor-pointer"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - r.left) / r.width;
              setElapsed(Math.max(0, Math.min(SHOWREEL_TOTAL_SEC - 1, pct * SHOWREEL_TOTAL_SEC)));
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[oklch(0.75_0.18_350)] via-[oklch(0.65_0.22_350)] to-[oklch(0.5_0.2_340)]"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-foreground bg-white rounded-full shadow-[1px_1px_0_var(--ink)]"
              style={{ left: `calc(${progress}% - 6px)` }}
              aria-hidden
            />
          </div>
          {/* Timestamp + transport */}
          <div className="mt-2 flex items-center justify-between font-mono text-xs">
            <span>{fmtTime(elapsed)} / {fmtTime(SHOWREEL_TOTAL_SEC)}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => { setIdx((i) => (i - 1 + clips.length) % clips.length); setElapsed(0); }}
                className="px-2 py-0.5 border-2 border-foreground bg-white hover:bg-muted rounded-sm"
                aria-label="Previous chapter"
              >◀◀</button>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="px-2 py-0.5 border-2 border-foreground bg-white hover:bg-muted rounded-sm"
                aria-label={playing ? "Pause" : "Play"}
              >{playing ? "❚❚" : "▶"}</button>
              <button
                type="button"
                onClick={() => { setIdx((i) => (i + 1) % clips.length); setElapsed(0); }}
                className="px-2 py-0.5 border-2 border-foreground bg-white hover:bg-muted rounded-sm"
                aria-label="Next chapter"
              >▶▶</button>
              <span className="ml-1 opacity-60">VOL ▮▮▮▮▯</span>
            </div>
          </div>
          {/* Chapter list */}
          <ol className="mt-2 border-t border-foreground/20 pt-2 space-y-0.5">
            {clips.map((c, i) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setIdx(i);
                    const [m, s] = c.t.split(":").map(Number);
                    setElapsed(m * 60 + s);
                  }}
                  className={`w-full grid grid-cols-[auto_1fr_auto] items-center gap-2 px-1.5 py-1 font-mono text-[11px] rounded-sm text-left ${i === idx ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  <span className="opacity-70">{c.t}</span>
                  <span className="truncate">{c.label}</span>
                  <span className="opacity-70">{c.tag}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        {/* Footer status */}
        <div className="px-3 py-1 border-t-2 border-foreground bg-muted font-mono text-xs flex justify-between items-center">
          <span>SHOWREEL_2026.MP4</span>
          <span className="opacity-70">H.264 · 1920×1080 · 24fps</span>
        </div>
      </div>
      <div className="px-3 py-1 border-t-2 border-foreground bg-white font-mono text-xs flex justify-between">
        <Link to="/works" className="underline underline-offset-2 hover:text-primary">▶ open /works</Link>
        <span className="opacity-60">48.2 MB</span>
      </div>
    </WindowFrame>
  );
}


function Home() {
  const clock = useClock();

  return (
    <PageShell>
      {/* ============ DESKTOP ============ */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "radial-gradient(oklch(1 0 0 / .5) 1px, transparent 1.5px), linear-gradient(135deg, oklch(0.85 0.12 350) 0%, oklch(0.82 0.05 250) 50%, oklch(0.88 0.08 200) 100%)",
          backgroundSize: "18px 18px, cover",
        }}
      >
        <div className="mx-auto max-w-7xl px-3 md:px-6 py-6 md:py-10 space-y-5 md:space-y-6">
          {/* ===== TOP ROW: README + PORTRAIT ===== */}
          <div className="grid gap-5 md:gap-6 lg:grid-cols-12">
            <WindowFrame
              title="C:\YULIN.zip\README.txt"
              className="lg:col-span-8"
              status={`READY · ${clock} · 1 of 5 disks`}
            >
              <div className="bg-foreground text-background p-5 md:p-8 font-mono text-base md:text-lg leading-relaxed">
                <div className="text-primary">{">"} extracting YULIN.zip ...</div>
                <div className="opacity-70">{">"} 100% [████████████████████] OK</div>
                <div className="mt-4">
                  <span className="text-primary">$</span> cat README.txt
                </div>
                <div className="mt-3 space-y-2">
                  <div>Welcome to <span className="text-primary">YULIN.zip</span> — the personal archive of an AI video director working between Seoul and the rest of the internet.</div>
                  <div className="opacity-80">Open the folders below to browse brand films, music videos, animation, fashion visuals, and experiments.</div>
                </div>
                <div className="mt-6 font-display text-5xl md:text-7xl leading-[0.85]">
                  <span className="text-chrome-pink block">YULIN</span>
                  <span className="text-chrome block">.zip</span>
                </div>
                <div className="mt-4 font-display text-xl md:text-2xl text-background">AI VIDEO CREATOR · BRAND FILM · VISUAL STORY</div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/works" className="chrome-btn-pink text-sm">▶ Open /works</Link>
                  <Link to="/contact" className="chrome-btn text-sm">✉ Run contact.exe</Link>
                </div>
                <div className="mt-4 text-sm opacity-60">▮ press any key to continue_</div>
              </div>
            </WindowFrame>

            <div className="lg:col-span-4 space-y-5">
              <ShowreelPlayer />


              <WindowFrame title="system.info" variant="silver">
                <dl className="grid grid-cols-2 gap-x-3 gap-y-1 p-3 font-mono text-sm">
                  <dt className="opacity-60">LOCATION</dt><dd>Seoul / Remote</dd>
                  <dt className="opacity-60">STATUS</dt><dd className="text-primary">● Booking '26</dd>
                  <dt className="opacity-60">VERSION</dt><dd>v6.2026</dd>
                  <dt className="opacity-60">DISK</dt><dd>40+ projects</dd>
                  <dt className="opacity-60">UPTIME</dt><dd>06 yrs</dd>
                </dl>
              </WindowFrame>
            </div>
          </div>

          {/* ===== FOLDERS ===== */}
          <WindowFrame title="C:\YULIN.zip\ — 5 folders">
            <div className="bg-white p-4 md:p-6">
              <div className="font-mono text-sm uppercase mb-4 flex items-center gap-2 text-muted-foreground">
                <span>📁</span><span>My Categories</span> <span className="opacity-50">/ double-click to open</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {CATEGORIES.map((c, i) => {
                  const m = CATEGORY_META[c];
                  return (
                    <Link
                      key={c}
                      to="/works"
                      className="group flex flex-col items-center text-center p-3 rounded-md border-2 border-transparent hover:border-foreground hover:bg-muted transition-colors"
                      style={{ transform: `rotate(${(i % 2 === 0 ? -0.5 : 0.5)}deg)` }}
                    >
                      <div className="folder-icon group-hover:-translate-y-1 transition-transform" aria-hidden>
                        <span className="absolute inset-0 grid place-items-center font-display text-2xl text-white drop-shadow-[1px_1px_0_var(--ink)]">
                          {m.icon}
                        </span>
                      </div>
                      <div className="mt-3 font-display text-base leading-tight">{c}</div>
                      <div className="font-mono text-xs opacity-60">{m.size}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </WindowFrame>

          {/* ===== RECENT FILES (selected works) ===== */}
          <WindowFrame
            title="recent_files.exe — sorted by newest"
            status={`${works.length} files · type: video/mp4 · view: details`}
          >
            <div className="bg-white">
              {/* table header */}
              <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 border-b-2 border-foreground bg-muted font-mono text-xs uppercase">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Name</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-1">Year</div>
                <div className="col-span-2 text-right">Open</div>
              </div>
              <ul>
                {works.map((w, i) => (
                  <li key={w.slug} className="border-b border-foreground/20 last:border-b-0">
                    <Link
                      to="/works/$slug"
                      params={{ slug: w.slug }}
                      className="group grid grid-cols-12 gap-3 items-center px-3 md:px-4 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <div className="col-span-2 md:col-span-1">
                        <div className="relative w-14 h-14 md:w-12 md:h-12 border-2 border-foreground overflow-hidden rounded-sm bg-foreground">
                          <img src={w.thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      </div>
                      <div className="col-span-10 md:col-span-5 min-w-0">
                        <div className="font-display text-xl leading-none truncate">{w.title}</div>
                        <div className="font-mono text-xs opacity-70 truncate">
                          {w.slug}.mp4
                          {w.duration ? ` · ${w.duration}` : ""}
                        </div>
                      </div>
                      <div className="col-span-7 md:col-span-3 font-mono text-sm">
                        <span className="sticker-pink text-xs">{w.category}</span>
                      </div>
                      <div className="col-span-2 md:col-span-1 font-mono text-sm">{w.year}</div>
                      <div className="col-span-3 md:col-span-2 text-right font-mono text-sm">
                        <span className="inline-flex items-center gap-1 group-hover:text-primary-foreground">▶ open →</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 border-t-2 border-foreground bg-muted flex justify-between items-center">
                <span className="font-mono text-sm opacity-70">View all archived files</span>
                <Link to="/works" className="chrome-btn-pink text-xs">▶ /works</Link>
              </div>
            </div>
          </WindowFrame>

          {/* ===== PROCESS + ABOUT ===== */}
          <div className="grid gap-5 md:gap-6 lg:grid-cols-12">
            <WindowFrame title="process.exe — how files get made" className="lg:col-span-7">
              <div className="bg-white p-4 md:p-6">
                <div className="font-mono text-sm uppercase text-muted-foreground mb-3">Pipeline · 04 stages</div>
                <ol className="space-y-3">
                  {[
                    { n: "01", t: "Brief & Mood", d: "Treatment, references, written intent." },
                    { n: "02", t: "Pre-Viz", d: "Stills, style locks, character LoRAs." },
                    { n: "03", t: "Generate & Direct", d: "Runway, Kling, ComfyUI — per shot, not per habit." },
                    { n: "04", t: "Post & Finish", d: "Grade, sound design, finishing pass." },
                  ].map((s) => (
                    <li key={s.n} className="flex gap-4 items-start border-2 border-foreground rounded-md p-3 bg-muted">
                      <div className="font-display text-3xl text-primary leading-none">{s.n}</div>
                      <div className="min-w-0">
                        <div className="font-display text-lg leading-tight">{s.t}</div>
                        <div className="font-mono text-sm opacity-70">{s.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </WindowFrame>

            <WindowFrame title="about.txt" variant="silver" className="lg:col-span-5">
              <div className="bg-white p-4 md:p-6">
                <div className="sticker mb-3">⊹ NOTEPAD.EXE</div>
                <h2 className="font-display text-3xl md:text-4xl">Hi, I'm <span className="text-chrome-pink">YULIN</span></h2>
                <p className="mt-3 font-body text-base leading-relaxed">
                  Editor turned AI director. I make brand films, music videos, and speculative
                  campaigns with generative tools — directed with the rigor of a traditional set.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-sm">
                  {[
                    { k: "PROJECTS", v: "40+" },
                    { k: "YEARS", v: "06" },
                    { k: "BRANDS", v: "12" },
                    { k: "COFFEES", v: "∞" },
                  ].map((s) => (
                    <div key={s.k} className="border-2 border-foreground rounded-md p-2 bg-muted">
                      <div className="font-display text-2xl text-chrome-pink leading-none">{s.v}</div>
                      <div className="text-xs uppercase opacity-70 mt-1">{s.k}</div>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="chrome-btn mt-5 text-sm">Open about.txt →</Link>
              </div>
            </WindowFrame>
          </div>

          {/* ===== CONTACT DIALOG ===== */}
          <WindowFrame title="contact.exe — new message" variant="pink">
            <div className="bg-white p-5 md:p-10 text-center">
              <div className="sticker-pink mx-auto mb-3">⊹ DIALOG</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
                Got an idea? <br /><span className="text-chrome-pink">Let's ship it.</span>
              </h2>
              <p className="mt-3 font-mono text-base md:text-lg text-muted-foreground">
                Currently booking brand films &amp; campaigns for Spring 2026.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href="mailto:hello@yulin.zip" className="chrome-btn-pink">✉ hello@yulin.zip</a>
                <Link to="/contact" className="chrome-btn">[ OK ] open form</Link>
              </div>
            </div>
            <div className="px-3 py-1 border-t-2 border-foreground bg-muted font-mono text-sm flex justify-between">
              <span>reply within 24h</span>
              <span className="blink">▮</span>
            </div>
          </WindowFrame>

          {/* ===== TASKBAR ===== */}
          <div className="win">
            <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-b from-[oklch(0.95_0_0)] via-[oklch(0.82_0.01_250)] to-[oklch(0.6_0.01_250)] border-b-2 border-foreground">
              <span className="chrome-btn-pink !py-1 !px-3 text-xs">★ START</span>
              <div className="flex-1 flex items-center gap-1 overflow-x-auto">
                {["README.txt", "SHOWREEL_2026.MP4", "recent_files.exe", "process.exe", "about.txt", "contact.exe"].map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-1 border-2 border-foreground bg-white rounded-sm whitespace-nowrap">
                    ▣ {t}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs px-2 py-1 border-2 border-foreground bg-white rounded-sm whitespace-nowrap">
                🕒 {clock}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
