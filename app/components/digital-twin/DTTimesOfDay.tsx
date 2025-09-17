// app/components/digital-twin/DTTimesOfDay.tsx
"use client";

import NextImage from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sunrise, Sun, Cloud, Moon } from "lucide-react";

type Mode = "dawn" | "day" | "cloudy" | "night";

type Props = {
  /** Poster shown before first click (default = first tab's frame) */
  mediaSrc?: string;

  /** LOCAL sequence settings (files under /public) */
  dir?: string;         // e.g. "/angels"
  filePrefix?: string;  // "Angle_"
  ext?: string;         // ".jpg"
  startIndex?: number;  // 1
  endIndex?: number;    // 120

  /** Map buttons to actual FILENAMES (not indices) if you want exact frames */
  modeFrameAsFilename?: Partial<Record<Mode, number>>;

  /** Motion / buffering */
  fps?: number;         // 24
  preloadAhead?: number;// 12
};

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP  = { hidden:{opacity:0,y:24,filter:"blur(6px)"}, show:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.6,ease:EASE,staggerChildren:.08}}};
const ITEM  = { hidden:{opacity:0,y:14,filter:"blur(6px)"}, show:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.55,ease:EASE}}};
const VISUAL= { hidden:{opacity:0,y:18,scale:.985}, show:{opacity:1,y:0,scale:1,transition:{duration:.6,ease:EASE,delay:.06}}};

const MODES = [
  { key: "dawn"  as const, label: "Sunrise", Icon: Sunrise },
  { key: "day"   as const, label: "Day",     Icon: Sun     },
  { key: "cloudy"as const, label: "Cloudy",  Icon: Cloud   },
  { key: "night" as const, label: "Night",   Icon: Moon    },
];

const MODE_TIME: Record<Mode, string> = {
  dawn: "06:00 AM", day: "12:00 PM", cloudy: "06:00 PM", night: "12:00 AM",
};

export default function DTTimesOfDay({
  dir = "/angels",
  filePrefix = "Angle_",
  ext = ".jpg",
  startIndex = 1,
  endIndex = 120,
  mediaSrc,
  modeFrameAsFilename,
  fps = 24,
  preloadAhead = 12,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.4, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  /** Build local URLs */
  const total = Math.max(1, endIndex - startIndex + 1);
  const urls = useMemo(
    () => Array.from({ length: total }, (_, i) => `${dir}/${filePrefix}${startIndex + i}${ext}`),
    [dir, filePrefix, ext, startIndex, total]
  );

  /** Button target indices (0..total-1); overrideable with real filenames */
  const defaultIdx: Record<Mode, number> = {
    dawn: 0,
    day: Math.min(total - 1, Math.round(total * 0.25)),
    cloudy: Math.min(total - 1, Math.round(total * 0.625)),
    night: Math.min(total - 1, Math.round(total * 0.833)),
  };
  const idxForMode = (m: Mode) => {
    const override = modeFrameAsFilename?.[m];
    if (typeof override === "number") return Math.max(0, Math.min(total - 1, override - startIndex));
    return defaultIdx[m];
  };

  /** Use first tab (dawn) frame as poster by default */
  const initialIndex = idxForMode("dawn");
  const computedPoster = urls[initialIndex];
  const posterSrc = mediaSrc ?? computedPoster;

  /** State */
  const [mode, setMode] = useState<Mode>("dawn");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Caches / refs */
  const cache = useRef<Map<number, HTMLImageElement>>(new Map());
  const imgRef = useRef<HTMLImageElement | null>(null);   // viewer <img> (imperative swaps)
  const frameRef = useRef<number>(initialIndex);          // current index (no state → smoother)
  const targetRef = useRef<number | null>(null);
  const dirRef = useRef<1 | -1>(1);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);
  const abortRef = useRef(false);

  const mod  = (n: number) => (n + total) % total;
  const dist = (from: number, to: number) => {
    const cw = mod(to - from), ccw = mod(from - to);
    return cw <= ccw ? { d: cw, dir: 1 as 1 | -1 } : { d: ccw, dir: -1 as 1 | -1 };
  };

  /** Preload helpers */
  const loadIndex = (i: number) =>
    new Promise<void>((resolve) => {
      if (cache.current.has(i)) return resolve();
      const img = new window.Image();
      img.decoding = "async";
      img.src = urls[i];
      if (img.decode) {
        img.decode().catch(() => {}).finally(() => { cache.current.set(i, img); resolve(); });
      } else {
        img.onload = () => { cache.current.set(i, img); resolve(); };
        img.onerror = () => resolve();
      }
    });

  const preloadAheadPath = (start: number, dir: 1 | -1, count: number) => {
    const tasks: Promise<void>[] = [];
    for (let k = 1; k <= count; k++) tasks.push(loadIndex(mod(start + dir * k)));
    return Promise.all(tasks);
  };

  /** Warm up: when in view, cache the 4 key frames so first clicks are instant */
  useEffect(() => {
    if (!inView) return;
    const keys: number[] = ["dawn","day","cloudy","night"].map(m => idxForMode(m as Mode));
    keys.forEach(i => { void loadIndex(i); });
  }, [inView]); // eslint-disable-line

  /** Imperative swap (no React re-render) */
  const swapTo = (i: number) => {
    const ready = cache.current.get(i);
    if (ready && imgRef.current) {
      imgRef.current.src = ready.src;
      frameRef.current = i;
    }
  };

  /** Animate to target frame smoothly */
  const animateTo = async (to: number) => {
    if (to === frameRef.current) return;
    setHasInteracted(true);

    const { dir } = dist(frameRef.current, to);
    dirRef.current = dir;
    targetRef.current = to;

    // warm small buffer before starting
    await preloadAheadPath(frameRef.current, dir, Math.min(preloadAhead, total - 1));

    const frameDuration = 1000 / fps;

    const tick = async (t: number) => {
      if (!lastTickRef.current) lastTickRef.current = t;
      const elapsed = t - lastTickRef.current;

      if (elapsed >= frameDuration) {
        lastTickRef.current = t - (elapsed % frameDuration);

        const target = targetRef.current!;
        const cur = frameRef.current;

        if (cur === target) {
          lastTickRef.current = 0;
          rafRef.current = null;
          return; // arrived
        }

        const next = mod(cur + dirRef.current);

        // if next not ready, fetch a few ahead and wait this frame (prevents jank)
        if (!cache.current.has(next)) {
          setLoading(true);
          await preloadAheadPath(cur, dirRef.current, Math.min(4, preloadAhead));
          setLoading(false);
        } else {
          swapTo(next);
          // keep a rolling buffer ahead
          void preloadAheadPath(next, dirRef.current, Math.min(preloadAhead, total - 1));
        }
      }

      if (!abortRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    // start/continue the loop
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  /** Cleanup */
  useEffect(() => () => { abortRef.current = true; if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  /** Click handler */
  const onSelect = (m: Mode) => {
    setMode(m);
    animateTo(idxForMode(m));
  };

  return (
    <section ref={sectionRef} className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — title + buttons */}
          <motion.div variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5 md:pl-6">
            <motion.h3 variants={ITEM} className="typo-h2-md text-white/95">Change Time of Day</motion.h3>
            <motion.p variants={ITEM} className="typo-small mt-3 max-w-[520px] text-white/65">
              You can change the time of the day and check the sun&apos;s movement around your project
            </motion.p>

            <motion.div variants={WRAP} className="mt-8 flex flex-wrap gap-5">
              {MODES.map(({ key, label, Icon }) => {
                const active = mode === key;
                return (
                  <motion.button
                    key={key}
                    variants={ITEM}
                    type="button"
                    onClick={() => onSelect(key)}
                    aria-pressed={active}
                    title={`${label} — ${MODE_TIME[key]}`}
                    className={[
                      "group grid h-20 w-20 place-items-center rounded-2xl border transition",
                      "shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm",
                      active ? "border-white/20 bg-white/[0.10] ring-2 ring-[#C6F24E]/70"
                             : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
                    ].join(" ")}
                  >
                    <Icon className={active ? "h-7 w-7 text-[#C6F24E]" : "h-7 w-7 text-white/70 group-hover:text-white/85"} strokeWidth={2.2}/>
                    <span className="sr-only">{label} — {MODE_TIME[key]}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT — viewer */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-xs text-white/60">
                  This is a simplified web demo; the full product runs in Unreal Engine.
                </span>
              </div>

              <div className="relative aspect-[16/9]">
                {/* Poster (first tab frame) until first click */}
                {!hasInteracted ? (
                  <NextImage
                    src={posterSrc}
                    alt="Time of day — poster"
                    fill
                    sizes="(min-width: 1024px) 820px, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <img
                    ref={imgRef}
                    src={cache.current.get(frameRef.current)?.src ?? posterSrc}
                    alt={`Time of day — ${mode}`}
                    className="absolute inset-0 h-full w-full object-cover select-none"
                    draggable={false}
                  />
                )}

                {/* Time badge */}
                <div className="absolute right-3 top-3 rounded-md bg-black/50 px-2.5 py-1.5 text-[13px] font-semibold text-white/90">
                  {MODE_TIME[mode]}{loading ? " · loading…" : ""}
                </div>

                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
