// app/components/configgo/ConfiggoPipelines.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { BellRing, CalendarClock, ClipboardList, KanbanSquare } from "lucide-react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};

const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const VISUAL = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};

export default function ConfiggoPipelines() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={ref} className="relative" id="pipelines">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Sales pipelines & tasks
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Move deals forward with <span className="text-[#C6F24E]">playbooks</span>, SLAs & reminders
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — features */}
          <motion.aside
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="md:col-span-5"
          >
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Customize stages, enforce follow-ups, and keep every task visible. Replace clunky
              boards with a clear funnel and response-time trends.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: KanbanSquare, txt: "Custom pipelines per project with stage SLAs" },
                { Icon: BellRing, txt: "Auto-reminders & escalations on idle deals" },
                { Icon: ClipboardList, txt: "Task templates & playbooks for consistent follow-up" },
                { Icon: CalendarClock, txt: "Calendar sync for meetings & site visits" },
              ].map(({ Icon, txt }) => (
                <motion.li
                  key={txt}
                  variants={ITEM}
                  className="flex items-center gap-3.5"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    {/* 'block' removes inline-baseline quirks; centers perfectly */}
                    <Icon className="block h-4 w-4 text-[#C6F24E]" aria-hidden="true" />
                  </span>
                  <span className="typo-small leading-6 text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* KPIs */}
            <motion.div
              variants={ITEM}
              className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            >
              <div>
                <div className="text-xl font-[600] text-[#C6F24E]">+32%</div>
                <div className="text-xs text-white/70">Stage conversion</div>
              </div>
              <div>
                <div className="text-xl font-[600] text-[#C6F24E]">-41%</div>
                <div className="text-xs text-white/70">Idle time</div>
              </div>
              <div>
                <div className="text-xl font-[600] text-[#C6F24E]">3m</div>
                <div className="text-xs text-white/70">Avg. response</div>
              </div>
            </motion.div>
          </motion.aside>

          {/* RIGHT — visual (single image inside window chrome) */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              {/* image area — no forced aspect ratio to avoid bars; image fully visible */}
              <div className="relative w-full bg-white/5">
                <Image
                  src="/crm/sozlesmeler.jpeg" // replace with your image path
                  alt="Pipelines visual"
                  width={1280}
                  height={720}
                  className="w-full h-auto object-contain"
                  priority={false}
                />
                {/* subtle inner ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {/* note */}
            <p className="typo-small mt-4 text-white/60">
              Enforce follow-ups with SLAs, auto-remind idle deals, and trigger task playbooks on stage change.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
