// app/components/configgo/ConfiggoInventory.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Building2, Layers3, DollarSign, Tag } from "lucide-react";

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

export default function ConfiggoInventory({
  imageSrc = "/crm/blokgörünümü.jpeg",
  imageAlt = "Inventory visual",
}: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={ref} className="relative" id="inventory">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Inventory & availability
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Projects → Buildings → <span className="text-[#C6F24E]">Units</span> — live status & pricing
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — copy (no filters/switchers) */}
          <motion.aside variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5">
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Manage availability in real time. Hold units during negotiations, apply discounts,
              and update pricing in bulk. Everything stays in sync across quotes and offers.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: Building2, txt: "Project → building → unit hierarchy" },
                { Icon: Layers3, txt: "Holds & reservations with expiry" },
                { Icon: DollarSign, txt: "Dynamic pricing with bulk updates" },
                { Icon: Tag, txt: "Discounts & promos per unit type" },
              ].map(({ Icon, txt }) => (
                <motion.li key={txt} variants={ITEM} className="flex items-center gap-3.5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <Icon className="block h-4 w-4 text-[#C6F24E]" aria-hidden="true" />
                  </span>
                  <span className="typo-small leading-6 text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.aside>

          {/* RIGHT — visual (single image inside window chrome) */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 text-xs text-white/60">Vega Center · Live Availability</div>
              </div>

              {/* image area — no forced aspect ratio; show full image */}
              <div className="relative w-full bg-white/5">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1280}
                  height={720}
                  className="w-full h-auto object-contain"
                  priority={false}
                />
                {/* inner ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {/* note */}
            <p className="typo-small mt-4 text-white/60">
              Availability feeds quotes and offers instantly. Holds keep a unit reserved while your team finalizes paperwork.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
