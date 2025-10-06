// app/components/digital-twin/DTFutureIntegration.tsx
"use client";

import NextImage from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Sunrise, Sun, Cloud, Moon } from "lucide-react";

type Mode = "dawn" | "day" | "cloudy" | "night";

type Props = {
  /** Optional custom images per mode (override defaults) */
  media?: Partial<Record<Mode, string>>;
  /** Initial time-of-day shown */
  initialMode?: Mode;
  /** Next/Image quality */
  quality?: number;
};

/** Default images (place your files under /public to use these paths) */
const DEFAULT_MEDIA: Record<Mode, string> = {
  dawn:   "/saat/6.jpg",
  day:    "/saat/12.jpg",
  cloudy: "/saat/18.jpg",
  night:  "/saat/24.jpg",
};

const MODE_META: { key: Mode; label: string; time: string; Icon: any }[] = [
  { key: "dawn",   label: "Sunrise", time: "06:00", Icon: Sunrise },
  { key: "day",    label: "Day",     time: "12:00", Icon: Sun     },
  { key: "cloudy", label: "Cloudy",  time: "18:00", Icon: Cloud   },
  { key: "night",  label: "Night",   time: "00:00", Icon: Moon    },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;
// Framer can animate Next/Image by casting to any
const MotionImage = motion(NextImage as any);

export default function DTFutureIntegration({
  media,
  initialMode = "dawn",
  quality = 95,
}: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);

  const srcMap = useMemo(
    () => ({ ...DEFAULT_MEDIA, ...(media ?? {}) }) as Record<Mode, string>,
    [media]
  );

  const activeMeta = MODE_META.find((m) => m.key === mode)!;

  return (
    <section className="relative">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — title + mode buttons */}
          <div className="md:col-span-5 md:pl-6">
            <h3 className="typo-h2-md text-white/95">Change Time of Day</h3>
            <p className="typo-small mt-3 max-w-[520px] text-white/65">
              Switch between four moments—Sunrise, Day, Cloudy, and Night—and preview lighting on your project.
            </p>

            <div className="mt-8 flex flex-wrap gap-5">
              {MODE_META.map(({ key, label, Icon }) => {
                const active = mode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key)}
                    aria-pressed={active}
                    title={label}
                    className={[
                      "group grid h-20 w-20 place-items-center rounded-2xl border transition",
                      "shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm",
                      active
                        ? "border-white/20 bg-white/[0.10] ring-2 ring-[#C6F24E]/70"
                        : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
                    ].join(" ")}
                  >
                    <Icon
                      className={
                        active
                          ? "h-7 w-7 text-[#C6F24E]"
                          : "h-7 w-7 text-white/70 group-hover:text-white/85"
                      }
                      strokeWidth={2.2}
                    />
                    <span className="sr-only">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — viewer with smooth crossfade (no unmounts, no black flash) */}
          <div className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-xs text-white/60">Four-image preview · crossfade</span>
              </div>

              {/* image stage — keep ALL images mounted & fade their opacity */}
              <div className="relative aspect-[16/9]">
                {MODE_META.map(({ key }) => (
                  <MotionImage
                    key={key}
                    src={srcMap[key]}
                    alt={`Time of day — ${key}`}
                    fill
                    sizes="(min-width: 1024px) 820px, 100vw"
                    quality={quality}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                    draggable={false}
                    // Important: don't animate from 0 on first paint; just use current state
                    initial={false}
                    animate={{
                      opacity: mode === key ? 1 : 0,
                      scale: mode === key ? 1 : 1.01, // tiny scale diff to make the fade feel softer
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                    // Preload all 4 for instant swaps (remove if you prefer lazy loading)
                    priority
                  />
                ))}

                {/* time badge */}
                <div className="absolute right-3 top-3 rounded-md bg-black/50 px-2.5 py-1.5 text-[13px] font-semibold text-white/90">
                  {activeMeta.time}
                </div>

                {/* inner ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
