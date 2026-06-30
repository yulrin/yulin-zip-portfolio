import { useCallback, useEffect, useRef, useState } from "react";

type OpeningSequenceProps = {
  onComplete: () => void;
};

type Stage = "ready" | "opening" | "complete";

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [stage, setStage] = useState<Stage>("ready");
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const lastTapRef = useRef(0);

  const startOpening = useCallback(() => {
    setStage((current) => (current === "ready" ? "opening" : current));
  }, []);

  const finish = useCallback(() => {
    setLeaving(true);
    window.setTimeout(onComplete, 260);
  }, [onComplete]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    openButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (stage !== "opening") return;

    let animationFrame = 0;
    const startedAt = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 350 : 1750;

    const update = (now: number) => {
      const ratio = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        animationFrame = requestAnimationFrame(update);
      } else {
        setStage("complete");
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [stage]);

  useEffect(() => {
    if (stage !== "complete") return;
    const leaveTimer = window.setTimeout(() => setLeaving(true), 620);
    const completeTimer = window.setTimeout(onComplete, 880);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, stage]);

  const loadingMessage =
    progress < 38
      ? "Loading Portfolio..."
      : progress < 72
        ? "Preparing Interface..."
        : "Scanning Media...";

  return (
    <div
      className={`opening-screen ${leaving ? "opening-screen--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="YULIN.zip 포트폴리오 열기"
    >
      <div className="opening-desktop-scene" aria-hidden="true">
        <div className="opening-desktop-icon opening-folder-icon opening-folder-a">
          <span className="opening-folder-shape" />
          <span>PROJECTS</span>
        </div>
        <div className="opening-desktop-icon opening-cd-icon">
          <span className="opening-cd-shape" />
          <span>SHOWREEL.cd</span>
        </div>
        <div className="opening-desktop-icon opening-text-icon">
          <span className="opening-text-shape">TXT</span>
          <span>ABOUT.txt</span>
        </div>
        <div className="opening-desktop-icon opening-message-icon">
          <span className="opening-message-shape">♥</span>
          <span>CONTACT.msg</span>
        </div>
        <span className="opening-pixel-cursor" />
        <span className="opening-desktop-star">✦</span>
        <span className="opening-desktop-heart">♥</span>
      </div>

      <div className="opening-pearl-sparkles" aria-hidden="true">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className={`opening-window opening-window--${stage} win`} aria-live="polite">
        <div className="win-bar">
          <div className="flex items-center gap-2">
            <span className="win-dot" aria-hidden="true">
              ▣
            </span>
            <span>YULIN.zip / OPEN ARCHIVE</span>
          </div>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="win-dot">_</span>
            <span className="win-dot">▢</span>
            <span className="win-dot">×</span>
          </div>
        </div>

        <div className="opening-content">
          {stage === "ready" && (
            <div className="flex w-full flex-col items-center">
              <div className="opening-path-label">PERSONAL ARCHIVE / READY</div>
              <button
                ref={openButtonRef}
                type="button"
                className="opening-file group"
                aria-label="YULIN.ZIP 파일 열기"
                onDoubleClick={startOpening}
                onPointerUp={(event) => {
                  if (event.pointerType !== "touch") return;
                  const now = Date.now();
                  if (now - lastTapRef.current < 500) startOpening();
                  lastTapRef.current = now;
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    startOpening();
                  }
                }}
                aria-describedby="opening-help"
              >
                <span className="zip-file-icon" aria-hidden="true">
                  <span className="zip-file-zipper">ZIP</span>
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
                  YULIN<span className="text-primary">.ZIP</span>
                </span>
              </button>
              <p id="opening-help" className="opening-main-instruction">
                Double click to open.
              </p>
              <p className="opening-sub-instruction">
                두 번 클릭하면 포트폴리오가 열립니다. · Enter로 시작하기
              </p>
              <div className="opening-file-meta">
                <span>PERSONAL ARCHIVE</span>
                <span>READY TO OPEN</span>
              </div>
            </div>
          )}

          {stage === "opening" && (
            <div className="w-full max-w-md text-left">
              <div className="flex items-end justify-between gap-4">
                <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-[-0.025em]">
                  Opening Archive...
                </h1>
                <span className="font-mono text-xl text-signal">{progress}%</span>
              </div>
              <div
                className="opening-progress mt-5"
                role="progressbar"
                aria-label="포트폴리오 준비 진행률"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div className="opening-progress__bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-5 min-h-24 space-y-1 font-mono text-sm sm:text-base">
                <p className={progress >= 10 ? "opacity-100" : "opacity-25"}>
                  ✓ Loading Portfolio...
                </p>
                <p className={progress >= 38 ? "opacity-100" : "opacity-25"}>
                  ✓ Preparing Interface...
                </p>
                <p className={progress >= 72 ? "opacity-100" : "opacity-25"}>✓ Reading Assets...</p>
                <p className={progress >= 88 ? "opacity-100" : "opacity-25"}>✓ Scanning Media...</p>
              </div>
              <p className="font-mono text-sm text-muted-foreground">{loadingMessage}</p>
            </div>
          )}

          {stage === "complete" && (
            <div className="opening-complete">
              <div className="opening-check" aria-hidden="true">
                ✓
              </div>
              <h1 className="mt-5 font-mono text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-chrome">
                Complete.
              </h1>
              <p className="mt-3 font-mono text-base sm:text-lg">Launching Portfolio...</p>
            </div>
          )}
        </div>

        <div className="opening-footer flex items-center justify-between gap-3 border-t-2 border-foreground px-3 py-2 font-pixel text-xs">
          <span>YULIN OS v6.2026 · READY TO OPEN</span>
          <button
            type="button"
            onClick={finish}
            className="rounded px-2 py-1 underline underline-offset-2 hover:text-primary"
          >
            건너뛰기 →
          </button>
        </div>
      </div>
    </div>
  );
}
