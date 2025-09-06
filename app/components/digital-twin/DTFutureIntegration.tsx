// app/components/digital-twin/DTFutureIntegration.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Globe, Map, MonitorSmartphone } from "lucide-react";

type Props = {
  mediaSrc?: string;      // /public path
  videoSrc?: string;      // optional mp4/webm
  rightTitle?: string;
};

const POINTS = [
  {
    icon: Globe,
    text:
      "Leverage the power of Internet of Things (IoT) integrations for real-time data synchronization",
  },
  {
    icon: Map,
    text:
      "Visualize future development plans and urban planning scenarios with stunning clarity",
  },
  {
    icon: MonitorSmartphone,
    text:
      "Omnichannel accessibility, ensuring a consistent experience across devices and platforms",
  },
] as const;

/* ---------- Animation variants (make sure these exist BEFORE use) ---------- */
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
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

const VISUAL = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.06 } },
};

export default function DTFutureIntegration({
  mediaSrc = "/digital-twin/integration.jpg",
  videoSrc,
  rightTitle = "Lorem Ipsum Dolor Sit Amet",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={ref} className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — white info card */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="md:col-span-6 md:self-center"
          >
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-12">
              <motion.div variants={ITEM} className="mb-10">
                <p className="typo-h2-md text-neutral-900/90">Future Focused</p>
                <h3 className="mt-2 font-[600] leading-[1.02] text-neutral-900 md:text-[56px]">
                  Integration
                </h3>
              </motion.div>

              <motion.ul variants={WRAP} className="space-y-6">
                {POINTS.map(({ icon: Icon, text }, i) => (
                  <motion.li key={i} variants={ITEM}>
                    <div className="grid grid-cols-[auto_1px_1fr] items-center gap-5">
                      {/* icon square */}
                      <div className="grid h-10 w-10 place-items-center rounded-md border border-neutral-200 bg-white">
                        <Icon className="h-5 w-5 text-[#C6F24E]" strokeWidth={2.2} />
                      </div>
                      <div className="h-10 w-px bg-neutral-200" />
                      <p className="typo-small text-neutral-700">{text}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* RIGHT — dark media panel with lime title */}
          <motion.div
            variants={VISUAL}
            initial="hidden"
            animate={controls}
            className="md:col-span-6 md:self-center"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)] md:p-12">
              <h4 className="text-center text-[#C6F24E] font-[400] md:text-[28px]">
                {rightTitle}
              </h4>

              <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-black/80 p-3 shadow-lg">
                {/* window chrome */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>

                <div className="relative aspect-[16/9] overflow-hidden rounded-[12px]">
                  {videoSrc ? (
                    <video
                      src={videoSrc}
                      poster={mediaSrc}
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={mediaSrc}
                      alt="Integration showcase"
                      fill
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
