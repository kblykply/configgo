// app/components/about/AboutUsSection.tsx
"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";

/* --- animations (robust: animate when in view) --- */
const container: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, staggerChildren: 0.08, ease: [0.22, 0.61, 0.36, 1] },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function AboutUsSection() {
  /* ---- fog effect refs (safe no-op on touch) ---- */
  const gridRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const s = useRef({ tx: 0, ty: 0, x: 0, y: 0, to: 0, o: 0, running: false });

  const registerCard = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) cardEls.current[idx] = el;
  };

  const paintAll = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const gRect = grid.getBoundingClientRect();
    for (const el of cardEls.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const localX = s.current.x - (r.left - gRect.left);
      const localY = s.current.y - (r.top - gRect.top);
      el.style.setProperty("--mx", `${localX}px`);
      el.style.setProperty("--my", `${localY}px`);
      el.style.setProperty("--fog-o", `${s.current.o}`);
    }
  };

  const tick = () => {
    const kPos = 0.18;
    const kOp = 0.14;
    s.current.x += (s.current.tx - s.current.x) * kPos;
    s.current.y += (s.current.ty - s.current.y) * kPos;
    s.current.o += (s.current.to - s.current.o) * kOp;
    paintAll();
    if (s.current.o < 0.01 && s.current.to === 0) {
      s.current.o = 0;
      s.current.running = false;
      rafRef.current = null;
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    if (!s.current.running) {
      s.current.running = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    s.current.tx = e.clientX - rect.left;
    s.current.ty = e.clientY - rect.top;
    s.current.to = 1;
    startLoop();
  };
  const onMouseEnter = onMouseMove;
  const onMouseLeave = () => {
    s.current.to = 0;
    startLoop();
  };

  return (
    <section
      className="relative py-12 md:py-16"
      style={{
        // ensures it never hides under your fixed header when linked
        scrollMarginTop: "clamp(72px,16vh,120px)",
      }}
    >
      <div className="mx-auto max-w-[1450px] px-5 md:px-8">
        <div className="mb-6 h-px w-full bg-white/10 md:mb-8" />

        <motion.div
          ref={gridRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-10% 0px -15% 0px" }}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="grid grid-cols-1 items-stretch gap-8 md:gap-10 lg:grid-cols-12"
        >
          {/* LEFT (compact) */}
          <div className="flex max-w-[560px] flex-col lg:col-span-4 xl:col-span-4">
            <motion.p
              variants={item}
              className="mb-2 text-[12px] uppercase tracking-wide text-white/60"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About Configgo
            </motion.p>

            <motion.h2 variants={item} className="mb-3 leading-tight">
              <span
                className="block text-[28px] text-white md:text-[34px]"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
              >
                Redefining Real Estate
              </span>
              <span
                className="block text-[28px] text-[#C6F24E] md:text-[34px]"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                with Vision & Innovation
              </span>
            </motion.h2>

            <motion.p
              variants={item}
              className="text-justify text-[14px] leading-[21px] text-white/70 md:text-[15px] md:leading-[24px]"
            >
              We build CRM-integrated Archviz & Digital Twin tools for construction and real estate teams—so you can
              visualize faster, sell smarter, and operate with clarity.
            </motion.p>

            <div className="mt-6 flex flex-col gap-4">
              <StatCard
                register={registerCard(0)}
                eyebrow="Competitive Advantage"
                value="1.9×"
                description="Give buyers & investors unparalleled project clarity and stand out in a crowded market."
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StatCard
                  register={registerCard(1)}
                  eyebrow="Client Engagement"
                  value="2.1×"
                  description="Show the true experience with immersive tours and views, not static renders."
                />
                <StatCard
                  register={registerCard(2)}
                  eyebrow="Faster Approvals"
                  value="1.4×"
                  description="Time-based visualizations help stakeholders align and approve with confidence."
                />
              </div>
            </div>
          </div>

    {/* RIGHT IMAGE (cover image fully; crop as needed) */}
<motion.div variants={item} className="lg:col-span-8 xl:col-span-8 flex">
  <div className="relative w-full overflow-hidden rounded-[16px] ring-1 ring-white/10 bg-white/[0.03]">
    {/* window bar */}
    <div className="absolute left-0 right-0 top-0 z-10 flex h-8 items-center gap-2 bg-black/35 px-4">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
    </div>

    {/* Fixed height instead of aspect ratio */}
    <div className="relative h-[54vh] md:h-[60vh] lg:h-[77vh] bg-black/60">
  <Image
  src="/render.png"
  alt="Modern residential visualization"
  fill
  sizes="(min-width:1450px) 900px, (min-width:1024px) 60vw, 100vw"
  className="object-cover [object-position:50%_85%]"  // Tailwind arbitrary value
/>
    </div>

    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
  </div>
</motion.div>





        </motion.div>

        <div className="mt-8 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}

/* --- Compact stat card with green fog overlay --- */
function StatCard({
  eyebrow,
  value,
  description,
  register,
}: {
  eyebrow: string;
  value: string;
  description: string;
  register: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={register}
      className="relative overflow-hidden rounded-[12px] p-5 backdrop-blur-[2px] ring-1 ring-white/10
                 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.08)_100%)]
                 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_14px_32px_rgba(0,0,0,0.32)]"
    >
      {/* subtle green fog */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(110px 110px at var(--mx) var(--my),
              rgba(182,225,61,0.40) 0%,
              rgba(182,225,61,0.16) 40%,
              rgba(182,225,61,0.00) 68%
            ),
            radial-gradient(220px 220px at var(--mx) var(--my),
              rgba(182,225,61,0.10) 0%,
              rgba(182,225,61,0.00) 78%
            )
          `,
          opacity: "var(--fog-o, 0)",
          transition: "opacity 160ms ease",
          filter: "saturate(110%)",
        }}
      />

      <div className="relative z-10">
        <p
          className="text-[12px] text-white/80"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
        >
          {eyebrow}
        </p>
        <div className="mt-1">
          <span
            className="text-[26px] text-white md:text-[30px]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            {value}
          </span>
        </div>
        <p className="mt-2 text-justify text-[12px] leading-[18px] text-white/65">{description}</p>
      </div>
    </div>
  );
}
