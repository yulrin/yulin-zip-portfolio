import { useEffect, useState, type CSSProperties } from "react";

type Stage = "boot" | "desktop" | "extract" | "launch";

interface IntroProps {
  onComplete: () => void;
}

const icons = [
  ["📁", "Projects"],
  ["💿", "Showreel"],
  ["📷", "About"],
  ["💌", "Contact"],
  ["🗑", "Trash"],
  ["📦", "YULIN.zip"],
];

const bootSteps = [
  { value: 0, delay: 0 },
  { value: 38, delay: 400 },
  { value: 71, delay: 900 },
  { value: 92, delay: 1400 },
  { value: 100, delay: 1900 },
];

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState<Stage>("boot");
  const [bootProgress, setBootProgress] = useState(0);
  const [extractProgress, setExtractProgress] = useState(0);
  const [selectedZip, setSelectedZip] = useState(false);
  const [pressedZip, setPressedZip] = useState(false);

  useEffect(() => {
    document.title = "Booting... | YULIN OS";
    playSound("startup");
  
    const timers: number[] = [];
    let progressTimer: number | undefined;
  
    bootSteps.forEach(({ value, delay }) => {
      timers.push(
        window.setTimeout(() => {
          setBootProgress(value);
        }, delay),
      );
    });
  
    timers.push(
      window.setTimeout(() => {
        setStage("desktop");
        document.title = "YULIN OS";
      }, 2200),
    );
  
    timers.push(
      window.setTimeout(() => {
        setSelectedZip(true);
        playSound("click");
      }, 3300),
    );
  
    timers.push(
      window.setTimeout(() => {
        setPressedZip(true);
        playSound("click");
      }, 4600),
    );
  
    timers.push(
      window.setTimeout(() => {
        setPressedZip(false);
      }, 4900),
    );
  
    timers.push(
      window.setTimeout(() => {
        setStage("extract");
        setExtractProgress(0);
        document.title = "Extracting YULIN.zip...";
        playSound("extract");
  
        progressTimer = window.setInterval(() => {
          setExtractProgress((prev) => {
            if (prev >= 100) {
              if (progressTimer) window.clearInterval(progressTimer);
              return 100;
            }
  
            return Math.min(prev + 6, 100);
          });
        }, 70);
      }, 5300),
    );
  
    timers.push(
      window.setTimeout(() => {
        setStage("launch");
        document.title = "Launching YULIN.zip...";
      }, 7600),
    );
  
    timers.push(
      window.setTimeout(() => {
        document.title = "YULIN.zip — Creative Archive";
        onComplete();
      }, 8600),
    );
  
    return () => {
      timers.forEach(window.clearTimeout);
      if (progressTimer) window.clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.crt} />

      <button style={styles.skip} onClick={onComplete}>
        Skip Intro
      </button>

      {stage === "boot" && (
        <section style={styles.boot}>
          <h1 style={styles.bootTitle}>YULIN OS</h1>
          <p style={styles.bootText}>Initializing...</p>

          <div style={styles.bootBar}>
            <div
              style={{
                ...styles.bootFill,
                width: `${bootProgress}%`,
              }}
            />
          </div>

          <p style={styles.bootPercent}>{bootProgress}%</p>
        </section>
      )}

      {stage === "desktop" && (
        <section style={styles.desktop}>
          <span style={styles.sparkleOne}>✦</span>
          <span style={styles.sparkleTwo}>✧</span>
          <span style={styles.sparkleThree}>✦</span>
          <span style={styles.sparkleFour}>✧</span>

          <div style={styles.iconGrid}>
            {icons.map(([emoji, label], index) => {
              const isZip = label === "YULIN.zip";

              return (
                <div
                  key={label}
                  style={{
                    ...styles.icon,
                    animationDelay: `${index * 0.12}s`,
                    ...(isZip && selectedZip ? styles.selectedIcon : {}),
                    ...(isZip && pressedZip ? styles.pressedIcon : {}),
                  }}
                >
                  <div style={styles.iconEmoji}>{emoji}</div>
                  <div style={styles.iconLabel}>{label}</div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              ...styles.cursor,
              transform: selectedZip
                ? "translate(185px, 304px)"
                : "translate(62vw, 45vh)",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 32 32">
              <path
                d="M5 3 L5 27 L12 20 L16 29 L21 27 L17 18 L27 18 Z"
                fill="white"
                stroke="#111"
                strokeWidth="1.6"
              />
            </svg>
          </div>
        </section>
      )}

      {stage === "extract" && (
        <section style={styles.extractWindow}>
          <div style={styles.windowTop}>YULIN Extractor</div>

          <div style={styles.windowBody}>
            <h2 style={styles.extractTitle}>Extracting YULIN.zip...</h2>

            <div style={styles.extractBar}>
              <div
                style={{
                  ...styles.extractFill,
                  width: `${extractProgress}%`,
                }}
              />
            </div>

            <p style={styles.percent}>{extractProgress}%</p>
            <p style={styles.complete}>
              {extractProgress >= 100 ? "Complete." : "Restoring archive..."}
            </p>

            <span style={styles.tinySparkle}>✦</span>
            <span style={styles.tinySparkleTwo}>✧</span>
          </div>
        </section>
      )}

      {stage === "launch" && (
        <section style={styles.console}>
          <p>Archive restored.</p>
          <p style={styles.launchText}>Launching YULIN.zip...</p>
        </section>
      )}
    </div>
  );
}

function playSound(type: "startup" | "click" | "extract") {
  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    const audio = new AudioContextClass();

    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.connect(gain);
    gain.connect(audio.destination);

    if (type === "startup") {
      osc.frequency.value = 620;
      gain.gain.value = 0.13;
    }

    if (type === "click") {
      osc.frequency.value = 980;
      gain.gain.value = 0.09;
    }

    if (type === "extract") {
      osc.frequency.value = 430;
      gain.gain.value = 0.1;
    }

    osc.start();
    osc.stop(audio.currentTime + 0.15);
  } catch {
    // autoplay may be blocked
  }
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    overflow: "hidden",
    fontFamily: "'JetBrains Mono', monospace",
    background: "#050505",
  },

  crt: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "linear-gradient(rgba(255,255,255,0.045) 50%, rgba(0,0,0,0.045) 50%)",
    backgroundSize: "100% 4px",
    mixBlendMode: "overlay",
    opacity: 0.35,
  },

  skip: {
    position: "absolute",
    right: 24,
    bottom: 24,
    zIndex: 10,
    border: "1px solid rgba(255,255,255,0.45)",
    background: "rgba(255,255,255,0.14)",
    color: "white",
    padding: "8px 14px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 12,
    backdropFilter: "blur(8px)",
  },

  boot: {
    height: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  bootTitle: {
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 18,
  },

  bootText: {
    fontSize: 14,
    opacity: 0.85,
  },

  bootBar: {
    width: 280,
    height: 9,
    marginTop: 18,
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: 999,
    overflow: "hidden",
  },

  bootFill: {
    height: "100%",
    width: "0%",
    background: "linear-gradient(90deg, #ff8bc7, #ffffff)",
    transition: "width 0.45s ease",
  },

  bootPercent: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.7,
  },

  desktop: {
    position: "relative",
    height: "100%",
    background:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.95), transparent 18%), linear-gradient(135deg, #b9e7ff 0%, #f5c8ff 48%, #fff4fb 100%)",
    overflow: "hidden",
  },

  iconGrid: {
    position: "absolute",
    left: 42,
    top: 42,
    display: "grid",
    gridTemplateColumns: "repeat(2, 96px)",
    gap: "26px 30px",
  },

  icon: {
    width: 92,
    minHeight: 76,
    color: "#2f2750",
    textAlign: "center",
    borderRadius: 10,
    padding: 6,
    opacity: 0,
    animation: "iconPop 0.45s ease forwards",
  },

  selectedIcon: {
    background: "rgba(255,255,255,0.58)",
    outline: "1px solid rgba(70,120,255,0.8)",
  },

  pressedIcon: {
    transform: "scale(0.94)",
  },

  iconEmoji: {
    fontSize: 34,
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.16))",
  },

  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    background: "rgba(255,255,255,0.68)",
    borderRadius: 6,
    padding: "2px 5px",
  },

  cursor: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 34,
    height: 34,
    zIndex: 5,
    transition: "transform 1.4s cubic-bezier(.2,.8,.2,1)",
    filter: "drop-shadow(0 4px 7px rgba(0,0,0,0.35))",
  },

  sparkleOne: {
    position: "absolute",
    right: "18%",
    top: "20%",
    color: "white",
    fontSize: 28,
  },

  sparkleTwo: {
    position: "absolute",
    right: "34%",
    bottom: "25%",
    color: "white",
    fontSize: 18,
  },

  sparkleThree: {
    position: "absolute",
    left: "48%",
    top: "36%",
    color: "white",
    fontSize: 20,
  },

  sparkleFour: {
    position: "absolute",
    left: "62%",
    bottom: "38%",
    color: "white",
    fontSize: 16,
  },

  extractWindow: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 370,
    transform: "translate(-50%, -50%)",
    background: "rgba(255,255,255,0.84)",
    border: "1px solid rgba(255,255,255,0.9)",
    borderRadius: 18,
    boxShadow: "0 24px 80px rgba(88,57,120,0.25)",
    overflow: "hidden",
    backdropFilter: "blur(14px)",
    animation: "windowPop 0.35s ease",
  },

  windowTop: {
    padding: "10px 14px",
    background: "linear-gradient(90deg, #ff8bc7, #b78cff)",
    color: "white",
    fontSize: 13,
    fontWeight: 700,
  },

  windowBody: {
    position: "relative",
    padding: 22,
    color: "#2f2750",
  },

  extractTitle: {
    fontSize: 15,
    marginBottom: 16,
  },

  extractBar: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    background: "rgba(80,60,120,0.16)",
    overflow: "hidden",
  },

  extractFill: {
    height: "100%",
    background: "linear-gradient(90deg, #ff72b6, #fff)",
    transition: "width 0.12s ease",
  },

  percent: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.75,
  },

  complete: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: 700,
  },

  tinySparkle: {
    position: "absolute",
    right: 34,
    top: 48,
    color: "#fff",
    fontSize: 20,
  },

  tinySparkleTwo: {
    position: "absolute",
    right: 78,
    bottom: 28,
    color: "#fff",
    fontSize: 14,
  },

  console: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    background: "rgba(0,0,0,0.88)",
    border: "1px solid rgba(255,255,255,0.24)",
    borderRadius: 12,
    padding: 24,
    color: "#d9ffd9",
    fontSize: 14,
    boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
    animation: "windowPop 0.3s ease",
  },

  launchText: {
    color: "#fff",
    marginTop: 10,
  },
};