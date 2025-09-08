// app/components/WebSolutionsSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

const wrap: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1], staggerChildren: 0.06, when: "beforeChildren" },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] } },
};

const LOGOS = [



  
  { src: "/shelton-logo-beyaz.png", alt: "Shelton" },
  { src: "/ONYX-PORTREbeyaz.png", alt: "Onyx Portre" },
  { src: "/zirvebeton-LOGO-beyaz.png", alt: "Zirve Beton" },
  { src: "/trholdingbeyazlogo.png", alt: "TR Holding" },
  { src: "/vegacenter-beyaz-logo.png", alt: "Vega Center" },
  { src: "/NATA-logobeyaz.png", alt: "NATA Holding" },
  { src: "/kesif.png", alt: "İkeşif" },
];

export default function WebSolutionsSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={rootRef} className="relative overflow-hidden py-16 md:py-24">
      {/* ambient lights */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 70% 12%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(900px 560px at 18% 60%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1450px] px-6 md:px-10">
        {/* Section heading — with right-side line */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-white/50 text-sm">Who are We?</span>
           <span
  aria-hidden
  className="h-px flex-1"
  style={{
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.22) 40%, rgba(255,255,255,0.35) 100%)",
  }}
/>

          </div>

          <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.02em] text-white">
            Explore <span className="text-white/80">Our Web Solutions</span>
          </h2>
        </div>

   <motion.div
  variants={wrap}
  initial="hidden"
  whileInView="show"
  viewport={{ amount: 0.30, margin: "-100px 0px -100px 0px", /* once: false by default */ }}
  className="space-y-6 md:space-y-8"
>
          {/* TOP — CRM Based Archviz System */}
          <motion.div variants={item}>
            <div
              className="relative grid grid-cols-1 md:grid-cols-12 gap-6 rounded-3xl p-8 md:p-10
                         bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)]
                         ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_28px_70px_rgba(0,0,0,0.5)]"
            >
              {/* left text */}
              <div className="md:col-span-6 lg:col-span-5 xl:col-span-5">
                <div className="text-[#C6F24E] text-[12px] tracking-wide mb-3">CRM SERVICES</div>
                <h3 className="text-white text-[28px] md:text-[34px] leading-tight font-semibold">
                  CRM Based <br />
                  <span className="font-[300] text-white/90">Archviz System</span>
                </h3>
                <p className="mt-4 text-white/70 max-w-[58ch] leading-7 text-[15px]">
                  Configgo proudly introduces the CRM Based Archviz System, an innovative tool designed to revolutionize
                  how construction projects are presented and experienced. By seamlessly integrating advanced visualization and
                  CRM capabilities, this product empowers users to showcase their projects with precision and style.
                </p>
              </div>

              {/* right graphics image */}
              <div className="md:col-span-6 lg:col-span-7 xl:col-span-7">
                <div className="relative w-full h-[260px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden">
                  {/* light gradient sweep */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(900px 540px at 10% 0%, rgba(198,242,78,0.18), transparent 50%), radial-gradient(900px 640px at 100% 100%, rgba(255,255,255,0.05), transparent 70%)",
                    }}
                  />
                  <Image
                    src="/suncity/Suncity.jpg" // replace with your graph composite
                    alt="Analytics"
                    fill
                    className="object-cover"
                    sizes="(min-width:1450px) 800px, (min-width:1024px) 60vw, 100vw"
                    priority
                  />
                  {/* frame */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/90" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM — two equal-height cards */}
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch"
          >
            {/* Left card — 360 walk */}
            <div className="md:col-span-6 flex">
              <div
                className="flex w-full h-full flex-col rounded-3xl p-6 md:p-7
                           bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)]
                           ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5">
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/60" />
                  <Image
                    src="/mega/Mega1453.jpg" // replace with your interior
                    alt="360 walk preview"
                    fill
                    className="object-cover"
                    sizes="(min-width:1450px) 560px, (min-width:1024px) 48vw, 100vw"
                  />
                </div>

               <div className="text-[#C6F24E] text-[12px] tracking-wide mb-1">DIGITAL TWIN</div>
<h4 className="text-white text-[20px] md:text-[22px] leading-tight mb-2">
  360° Immersive Walkthrough
</h4>
<p className="text-white/70 text-[14px] leading-6 mb-4">
  Step inside your future apartment before it’s even built. Our Digital Twin 
  technology allows clients to explore every corner in full detail, 
  experience layouts in real scale, and make confident decisions without 
  leaving their seat.
</p>

                <div className="mt-auto">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 h-[38px] px-4 rounded-lg
                               text-[14px] text-black bg-[#C6F24E] hover:brightness-95
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F24E]/60"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    See Demo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right card — Logos grid */}
            <div className="md:col-span-6 flex">
              <div
                className="relative w-full h-full rounded-3xl p-6 md:p-7
                           bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)]
                           ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_60px_rgba(0,0,0,0.45)]"
              >
                {/* faint squares background */}
                <div className="grid grid-cols-4 gap-4 opacity-[0.10] absolute inset-0 p-6 md:p-7">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-white/00" />
                  ))}
                </div>

            {/* logo grid and text */}
<div className="relative grid grid-cols-2 sm:grid-cols-3 gap-5 mb-6">
  {LOGOS.slice(0, 6).map((l) => (
    <div
      key={l.alt}
      className="relative aspect-[3/1] rounded-xl bg-white/5 ring-1 ring-white/10 
                 flex items-center justify-center px-6 py-4"
    >
      <Image
        src={l.src}
        alt={l.alt}
        width={160}   // ✅ constrain width
        height={48}   // ✅ constrain height
        className="object-contain opacity-90 max-h-[40px] md:max-h-[48px] w-auto"
      />
    </div>
  ))}
</div>


             <div className="text-[#C6F24E] text-[12px] tracking-wide mb-1">CRM INTEGRATION</div>
<h4 className="text-white text-[20px] md:text-[22px] leading-tight mb-2">
  Connected Client Experience
</h4>
<p className="text-white/70 text-[14px] leading-6 max-w-[60ch]">
  Our CRM-based Digital Twin system goes beyond visualization. 
  Every tour, inquiry, and interaction is tracked directly into your CRM, 
  creating a seamless workflow from first impression to final deal. 
  Manage leads, follow up faster, and deliver a premium sales journey.
</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
