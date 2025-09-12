// app/components/contact/MeetBooking.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
};

type Slot = { start: Date; end: Date };

export default function MeetBooking({
  hostEmail = "hello@yourstudio.com",
  title = "Configgo — Google Meet",
  details = "Short discovery call about your needs. We’ll walk you through Configgo and discuss next steps.",
  windowDays = 14,        // show slots for the next N days
  workStartHour = 10,     // 10:00 local
  workEndHour = 19,       // 19:00 local
  stepMinutes = 60,       // base step between options in the grid
}: {
  hostEmail?: string;
  title?: string;
  details?: string;
  windowDays?: number;
  workStartHour?: number;
  workEndHour?: number;
  stepMinutes?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.25, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  const [duration, setDuration] = useState<30 | 45 | 60>(30);

  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const days = useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i < windowDays; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [today, windowDays]);

  // Build slots for a given day (skip past hours if today)
  function buildSlots(d: Date): Slot[] {
    const slots: Slot[] = [];
    const isToday = sameDay(d, new Date());
    const start = new Date(d);
    start.setHours(workStartHour, 0, 0, 0);
    const end = new Date(d);
    end.setHours(workEndHour, 0, 0, 0);

    // move start forward if today & current time already passed some slots
    const now = new Date();
    if (isToday && now > start) {
      const mins = roundUpToStep(diffMinutes(start, now) + 1, stepMinutes);
      start.setMinutes(start.getMinutes() + mins);
    }

    let cursor = new Date(start);
    while (cursor < end) {
      const slotEnd = new Date(cursor);
      slotEnd.setMinutes(slotEnd.getMinutes() + duration);
      // ensure slot fits within working window
      if (slotEnd <= end) {
        slots.push({ start: new Date(cursor), end: slotEnd });
      }
      cursor.setMinutes(cursor.getMinutes() + stepMinutes);
    }
    return slots;
  }

  function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }
  function pad(n: number) { return n.toString().padStart(2, "0"); }
  function diffMinutes(a: Date, b: Date) { return Math.floor((b.getTime() - a.getTime()) / 60000); }
  function roundUpToStep(n: number, step: number) { return Math.ceil(n / step) * step; }

  // Google Calendar template. We intentionally DO NOT append "Z" so times stay in the user's local timezone.
  function gcalLink(slot: Slot) {
    const fmt = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    const dates = `${fmt(slot.start)}/${fmt(slot.end)}`;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: `${details}\n\nHost: ${hostEmail}\nBooked via Configgo site`,
      location: "Google Meet (auto-added by Calendar settings)",
      add: hostEmail, // add host as a guest
      dates,
    }).toString();
    return `https://calendar.google.com/calendar/render?${params}`;
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{
        paddingTop: "48px",
        paddingBottom: "96px",
        scrollMarginTop: "calc(var(--header-h, 72px) + 32px)",
      }}
    >
      {/* subtle background flare */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_-20%,rgba(255,255,255,0.06),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6">
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">About</motion.p>
          <motion.h2
            variants={ITEM}
            className="typo-hero-light mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#C6F24E]"
          >
            Make a Google Meet Booking for Configgo
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-3 text-white/65">
            Pick a time that works for you. Your timezone: <span className="text-white/85 font-medium">{tz}</span>.
            We’ll send a calendar invite and join via Google Meet.
          </motion.p>
        </motion.div>

        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm"
        >
          {/* Duration selector */}
          <motion.div variants={ITEM} className="mb-6 flex flex-wrap items-center gap-2">
            <span className="typo-small text-white/70 mr-2">Duration</span>
            {[30, 45, 60].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d as 30 | 45 | 60)}
                className={[
                  "rounded-full px-4 py-2 text-sm transition",
                  duration === d
                    ? "bg-[#C6F24E] text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10",
                ].join(" ")}
              >
                {d} min
              </button>
            ))}
            <span className="ml-auto typo-small text-white/50">
              Working hours: {pad(workStartHour)}:00–{pad(workEndHour)}:00
            </span>
          </motion.div>

          {/* Days + Slots */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {days.map((d) => {
              // Skip Sundays if you prefer (comment this out if Sundays should be available)
              // if (d.getDay() === 0) return null;

              const slots = buildSlots(d);
              const isToday = sameDay(d, new Date());
              const label = d.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              return (
                <motion.div
                  key={d.toISOString()}
                  variants={ITEM}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="typo-small-heading text-white/90">
                      {label} {isToday && <span className="text-white/40">(today)</span>}
                    </div>
                    <div className="text-xs text-white/50">
                      {slots.length ? `${slots.length} slot${slots.length > 1 ? "s" : ""}` : "No slots"}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {slots.length === 0 && (
                      <span className="text-xs text-white/45">No available times</span>
                    )}
                    {slots.map((s) => {
                      const timeLabel = s.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                      return (
                        <a
                          key={s.start.toISOString()}
                          href={gcalLink(s)}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10 transition"
                        >
                          {timeLabel}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-6 text-xs text-white/50">
            Tip: In Google Calendar settings, enable <span className="text-white/70 font-medium">“Automatically add Google
            Meet video conferences to events I create”</span> to attach a Meet link instantly.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
