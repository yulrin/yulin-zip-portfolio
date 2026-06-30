import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type OpeningSequenceProps = {
  onComplete: () => void;
};

type Stage = "boot" | "desktop" | "extracting" | "complete" | "launch";

const BOOT_LINES = [
  { label: "Loading Memories...", at: 350 },
  { label: "Loading Projects...", at: 800 },
  { label: "Loading Creativity...", at: 1250 },
];

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [stage, setStage] = useState<Stage>("boot");
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [cursor, setCursor] = useState({ x: 12, y: 18 });
  const [extractProgress, setExtractProgress] = useState(0);
  const [doubleClick, setDoubleClick] = useState(false);

  // lock scroll while overlay is mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ----- BOOT -----
  useEffect(() => {
    if (stage !== "boot") return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const r = Math.min((now - start) / duration, 1);
      setBootProgress(Math.round(r * 100));
      if (r < 1) raf = requestAnimationFrame(tick);
      else setStage("desktop");
    };
    raf = requestAnimationFrame(tick);
    const timers = BOOT_LINES.map((l, i) =>
      window.setTimeout(() => setBootStep(i + 1), l.at),
    );
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [stage]);

  // ----- DESKTOP -> cursor moves to YULIN.zip & double-clicks -----
  useEffect(() => {
    if (stage !== "desktop") return;
    const t1 = window.setTimeout(() => setCursor({ x: 50, y: 52 }), 200);
    const t2 = window.setTimeout(() => setDoubleClick(true), 1100);
    const t3 = window.setTimeout(() => setDoubleClick(false), 1300);
    const t4 = window.setTimeout(() => setStage("extracting"), 1500);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [stage]);

  // ----- EXTRACTING -----
  useEffect(() => {
    if (stage !== "extracting") return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const r = Math.min((now - start) / duration, 1);
      setExtractProgress(Math.round(r * 100));
      if (r < 1) raf = requestAnimationFrame(tick);
      else setStage("complete");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  // ----- COMPLETE -> LAUNCH -----
  useEffect(() => {
    if (stage !== "complete") return;
    const t1 = window.setTimeout(() => setStage("launch"), 700);
    return () => clearTimeout(t1);
  }, [stage]);

  useEffect(() => {
    if (stage !== "launch") return;
    const t = window.setTimeout(onComplete, 650);
    return () => clearTimeout(t);
  }, [stage, onComplete]);

  const sparkles = Array.from({ length: 22 });

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden font-mono"
      role="dialog"
      aria-modal="true"
      aria-label="YULIN OS intro"
    >
      <AnimatePresence mode="wait">
        {stage === "boot" && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center justify-center bg-black text-white"
          >
            <div className="w-[min(440px,86vw)] text-left">
              <div className="text-2xl font-bold tracking-widest">
                YULIN<span className="text-pink-400"> OS</span>{" "}
                <span className="text-white/60 text-base">v1.0</span>
              </div>
              <div className="mt-6 space-y-1 text-sm text-white/80 min-h-[80px]">
                {BOOT_LINES.map((l, i) => (
                  <div
                    key={l.label}
                    className={bootStep > i ? "opacity-100" : "opacity-25"}
                  >
                    <span className="text-pink-400">{bootStep > i ? "✓" : "·"}</span>{" "}
                    {l.label}
                  </div>
                ))}
              </div>
              <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 via-white to-pink-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${bootProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
              <div className="mt-2 text-[11px] text-white/50">{bootProgress}%</div>
            </div>
          </motion.div>
        )}

        {(stage === "desktop" ||
          stage === "extracting" ||
          stage === "complete" ||
          stage === "launch") && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,#fbe4f3 0%,#e7d6ff 45%,#cdeafe 100%)",
            }}
          >
            {/* CRT scanlines */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 3px)",
              }}
            />
            {/* vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 180px rgba(120,50,140,0.25)",
              }}
            />
            {/* sparkles */}
            {sparkles.map((_, i) => {
              const left = (i * 37) % 100;
              const top = (i * 53) % 100;
              return (
                <motion.span
                  key={i}
                  className="absolute text-white"
                  style={{ left: `${left}%`, top: `${top}%`, fontSize: 10 + (i % 3) * 4 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: (i % 7) * 0.3,
                  }}
                >
                  ✦
                </motion.span>
              );
            })}

            {/* desktop icons */}
            <div className="absolute inset-0 p-6 sm:p-10">
              <div className="grid w-[160px] grid-cols-1 gap-5 text-center text-[11px] sm:text-xs text-zinc-800">
                <DesktopIcon emoji="📁" label="Projects" />
                <DesktopIcon
                  emoji="🗂️"
                  label="YULIN.zip"
                  active={doubleClick}
                  highlight
                />
                <DesktopIcon emoji="💿" label="Showreel" />
                <DesktopIcon emoji="📷" label="About" />
                <DesktopIcon emoji="💌" label="Contact" />
                <DesktopIcon emoji="🗑" label="Trash" />
              </div>
            </div>

            {/* cursor */}
            <motion.svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
              animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
            >
              <path
                d="M2 2 L2 18 L7 14 L10 21 L13 20 L10 13 L17 13 Z"
                fill="white"
                stroke="black"
                strokeWidth="1.2"
              />
            </motion.svg>

            {/* extracting window */}
            <AnimatePresence>
              {(stage === "extracting" || stage === "complete") && (
                <motion.div
                  key="extract"
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 w-[min(360px,82vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border border-white/70 bg-white/85 shadow-[0_20px_60px_-10px_rgba(180,80,160,0.45)] backdrop-blur"
                >
                  <div className="flex items-center justify-between bg-gradient-to-b from-pink-300 to-pink-500 px-3 py-1.5 text-[11px] font-semibold text-white">
                    <span>Extracting — YULIN.zip</span>
                    <span className="flex gap-1">
                      <i className="block h-2 w-2 rounded-full bg-white/80" />
                      <i className="block h-2 w-2 rounded-full bg-white/80" />
                      <i className="block h-2 w-2 rounded-full bg-white/80" />
                    </span>
                  </div>
                  <div className="px-5 py-5 text-zinc-800">
                    <div className="text-sm">
                      {stage === "complete" ? "Complete." : "Extracting Portfolio..."}
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-500"
                        initial={{ width: "0%" }}
                        animate={{
                          width: stage === "complete" ? "100%" : `${extractProgress}%`,
                        }}
                        transition={{ ease: "easeOut", duration: 0.15 }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] text-zinc-500">
                      <span>{stage === "complete" ? "100" : extractProgress}%</span>
                      <span>
                        {stage === "complete" ? "Launching Portfolio..." : "1 file"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* launch expand overlay */}
            {stage === "launch" && (
              <motion.div
                key="launch"
                initial={{ scale: 0.2, opacity: 1, borderRadius: 24 }}
                animate={{ scale: 8, opacity: 0, borderRadius: 0 }}
                transition={{ duration: 0.6, ease: [0.6, 0, 0.4, 1] }}
                className="absolute left-1/2 top-1/2 h-40 w-60 -translate-x-1/2 -translate-y-1/2 bg-white"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* skip button */}
      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-4 right-4 z-10 rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur transition hover:bg-black/60"
      >
        Skip Intro →
      </button>
    </div>
  );
}

function DesktopIcon({
  emoji,
  label,
  active,
  highlight,
}: {
  emoji: string;
  label: string;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.div
      animate={active ? { scale: [1, 0.92, 1] } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-1"
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-md text-2xl ${
          highlight
            ? "bg-white/70 ring-2 ring-pink-400/70 shadow-[0_4px_14px_rgba(255,105,180,0.35)]"
            : ""
        }`}
      >
        {emoji}
      </div>
      <div
        className={`rounded px-1.5 py-0.5 ${
          highlight ? "bg-pink-500 text-white" : "text-zinc-800"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}
