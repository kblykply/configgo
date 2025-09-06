// app/components/HeroSlider.tsx
"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// HeroSlider.tsx üstüne (export default'tan önce) ekle
function SlideOneVisual() {
  const [vidReady, setVidReady] = useState(false);
  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {/* Büyük video arka planda (hazır olmadan görünmesin) */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: vidReady ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="aspect-square w-[clamp(720px,110vmin,1500px)] md:w-[clamp(820px,120vmin,1800px)] transform-gpu will-change-transform"
      >
        <video
          className="w-full h-full object-contain select-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setVidReady(true)}
          onLoadedData={() => setVidReady(true)}
        >
          <source src="/1.webm" type="video/webm" />
          <source src="/1video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Küçük poster üstte — video hazır olunca fade out */}
      <motion.div
        initial={{ opacity: 1, scale: 0.98 }}
        animate={{ opacity: vidReady ? 0 : 1, scale: vidReady ? 1 : 0.98 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ pointerEvents: "none" }}
      >
        <Image
          src="/1.png"
          alt=""
          width={900}
          height={900}
          className="w-[min(70vmin,900px)] md:w-[min(74vmin,1000px)] h-auto object-contain select-none"
          priority
        />
      </motion.div>
    </div>
  );
}


export default function HeroSlider() {
  const swiperRef = useRef<any>(null);

  // bottom-left dot pagination (external container)
// inside HeroSlider()

const pagination = useMemo(
  () => ({
    el: ".hero-pagination",
    clickable: true,

    // add strong active styling via classes Swiper toggles
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-white !text-black !scale-110 ring-2 ring-white/80",

    // render numeric bullets so you always know which slide is active
    renderBullet: (index: number, className: string) => {
      // Tailwind classes are static strings here, so JIT will include them
      return `
        <button type="button"
          class="${className} !w-7 !h-7 grid place-items-center rounded-full
                  border border-white/30 text-[11px] leading-none font-medium
                  text-white/70 !bg-white/15 hover:!bg-white/30 transition
                  focus:outline-none"
          aria-label="Go to slide ${index + 1}">
          ${index + 1}
        </button>
      `;
    },
  }),
  []
);



  // In case hydration order delays the external node, update once after mount
  useEffect(() => {
    const t = setTimeout(() => {
      const s = swiperRef.current?.swiper;
      try {
        s?.pagination?.init();
        s?.pagination?.render();
        s?.pagination?.update();
      } catch {}
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Hero Slider"
      className="relative w-full h-[100svh] overflow-hidden  text-white pt-20 md:pt-24"
    >
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_60%_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,.6)_70%,#000_100%)]" />

      <Swiper
        ref={swiperRef}
        className="h-full"
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        pagination={pagination as any}
        loop
        onBeforeInit={(swiper) => {
          // force-bind external container
          const p = swiper.params.pagination as any;
          p.el = ".hero-pagination";
          p.clickable = true;
        }}
        onAfterInit={(swiper) => {
          // ensure bullets are injected and visible
          try {
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          } catch {}
        }}
      >
        {/* SLIDE 1 */}
      <SwiperSlide>
  <div className="relative h-full w-full">
   {/* center VIDEO, anchored to viewport center with small poster overlay */}
<SlideOneVisual />



    {/* content */}
    <div className="relative z-20 h-full mx-auto max-w-[1450px] px-6 md:px-10">
      <div className="h-full grid items-center">
        <div className="max-w-[30ch]">
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="tracking-[-0.01em]"
            style={{  fontWeight: 600, fontSize: "clamp(28px, 4.5vw, 64px)", lineHeight: 1.08 }}
          >
            <span className="block">Bringing Real Estate</span>
            <span className="block">into the Digital Era</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-[70ch] text-[12px] md:text-sm text-white/70"
          >
            Unify all your real estate projects on one platform, deliver
            interactive experiences to clients, and move your sales office
            into the digital world.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-7">
            <Link
              href="#learn-more"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-5 py-3 text-[11px] md:text-sm uppercase tracking-[.2em] hover:border-white/70 transition"
            >
              Learn more <span aria-hidden className="inline-block translate-y-[1px]">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>

    {/* RIGHT TEXT BOX (info card) */}
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="hidden md:block absolute right-6 bottom-6 z-20 max-w-[320px] rounded-lg border border-white/15 bg-white/5 p-3 text-[11px] leading-relaxed text-white/75 backdrop-blur"
    >
      Unify all your real estate projects on one platform, deliver
      interactive experiences to clients, and move your sales office
      into the digital world.
    </motion.aside>
  </div>
</SwiperSlide>


      {/* === SLIDE 2 (with left-bottom green image) === */}
  <SwiperSlide>
<div
  className="relative w-full h-[calc(100dvh-var(--header))] md:h-[calc(100svh-var(--header))] min-h-0"
  style={{ ["--header" as any]: "96px" }}
>

        {/* LEFT-BOTTOM GREEN THINGS as image */}
      <div className="absolute left-0 bottom-0 z-10 pointer-events-none">
        <Image
          src="/2.png"   // put your green beams PNG/SVG in /public
          alt="Green neon beams"
          width={500}
          height={300}
          className="w-[40vw] max-w-[500px] h-auto select-none"
          priority
        />
      </div>

{/* CONTENT */}
<div
  style={{ ["--header" as any]: "96px" }} // your real header height
  className="relative z-20 mx-auto max-w-[1450px] px-6 md:px-10 h-[calc(100svh-var(--header))] min-h-0"
>
  <div className="grid grid-cols-12 gap-5 h-full min-h-0">
    {/* LEFT — vertically centered */}
    <div className="col-span-12 md:col-span-6 h-full min-h-0 flex flex-col justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        className="tracking-[-0.01em]"
        style={{ fontWeight: 600, fontSize: "clamp(20px, 3vw, 42px)", lineHeight: 1.15 }}
      >
        <span className="block">Smart Solutions for the</span>
        <span className="block">Future of Real Estate</span>
      </motion.h2>
  
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25 }}
        className="mt-3 max-w-[55ch] text-[11px] md:text-[13px] text-white/70 leading-relaxed"
      >
        From powerful CRM systems to high-quality renders and immersive digital
        twins, Confogoo provides end-to-end digital solutions that transform how
        real estate projects are presented, managed, and sold.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-5 flex items-center gap-3"
      >
        <span className="h-px w-10 bg-white/70" aria-hidden />
        <Link
          href="#tools"
          className="inline-flex items-center gap-1.5 text-[11px] md:text-xs tracking-[.1em] uppercase text-white/80 hover:text-white"
        >
          Learn more <span aria-hidden className="inline-block translate-y-[1px]">→</span>
        </Link>
      </motion.div>
    </div>

  <div className="col-span-12 md:col-span-6 h-full min-h-0 overflow-hidden">
<div
  style={{ ["--header" as any]: "96px" }} // set to your real header px
  className="
    grid w-full max-w-[620px] mx-auto
    grid-cols-2 gap-2 md:gap-3
    min-h-[calc(100svh-var(--header))]   /* make it as tall as the hero */
    place-content-center place-items-center
  "
>
  {/* r1: text | image */}
  <div className="self-center w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-2 md:p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <h3 className="text-[10px] md:text-[11px] font-medium text-white/90">Digital Twin</h3>
        <p className="mt-1 text-[9px] md:text-[10px] leading-tight text-white/60"
           style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          Explore projects interactively, simulate environments, and offer clients a complete preview of their future investments.
        </p>
      </div>
      <span className="text-[10px] md:text-xs leading-none text-white/70 pl-1 shrink-0">1</span>
    </div>
  </div>

  <div className="self-center mx-auto w-40 sm:w-48 md:w-56 lg:w-64 rounded-2xl overflow-hidden">
    <Image
      src="/digitaltwingorsel.png"
      alt="Digital Twin Illustration"
      width={520}
      height={320}
      className="w-full h-auto object-contain"
      priority={false}
    />
  </div>

  {/* r2: image | text  (← swapped side) */}
  <div className="self-center mx-auto w-40 sm:w-48 md:w-56 lg:w-64 rounded-2xl overflow-hidden">
    <Image
      src="/crmgorsel.png"
      alt="Interactive Experience"
      width={520}
      height={320}
      className="w-full h-auto object-contain"
      priority={false}
    />
  </div>

  <div className="self-center w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-2 md:p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <h3 className="text-[10px] md:text-[11px] font-medium text-white/90">Smart CRM for Real Estate</h3>
        <p className="mt-1 text-[9px] md:text-[10px] leading-tight text-white/60"
           style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          Automate lead tracking, manage customer relations, and streamline the sales funnel with solutions tailored for construction and real estate.
        </p>
      </div>
      <span className="text-[10px] md:text-xs leading-none text-white/70 pl-1 shrink-0">2</span>
    </div>
  </div>

  {/* r3: text | image */}
  <div className="self-center w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-2 md:p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <h3 className="text-[10px] md:text-[11px] font-medium text-white/90">High-Quality Render</h3>
        <p className="mt-1 text-[9px] md:text-[10px] leading-tight text-white/60"
           style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          Bring your projects to life with realistic renders and cinematic visuals.
        </p>
      </div>
      <span className="text-[10px] md:text-xs leading-none text-white/70 pl-1 shrink-0">3</span>
    </div>
  </div>

<div className="mx-auto self-center w-32 sm:w-40 md:w-48 lg:w-28">
  {/* vertical frame so nothing gets cropped */}
  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black/70">
    <video
      className="absolute inset-0 w-full h-full object-contain select-none"
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
      controls={false}
      onError={(e) => console.error("Video failed:", e.currentTarget.error)}
    >
      {/* If you also have a .webm, put it first */}
      {/* <source src="/crm-loop.webm" type="video/webm" /> */}
      <source src="/kule.mp4" type="video/mp4" />
    </video>
  </div>
</div>

</div>




</div>

  </div>
</div>





    </div>
  </SwiperSlide>  

{/* === SLIDE 3 (with your cube PNG) === */}
<SwiperSlide>
  <div className="relative h-full w-full">
    {/* BACKGROUND CUBE */}
    <div className="pointer-events-none absolute inset-0 z-0 grid place-items-center">
      <motion.div
        initial={{ scale: 0.92, opacity: 0.9, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: -8 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="w-[min(64vmin,600px)] h-[min(64vmin,600px)] translate-y-8"
      >
        <Image
          src="/4.png"   // <-- your PNG here
          alt=""
          width={600}
          height={600}
          priority
          className="w-full h-full object-contain select-none"
        />
      </motion.div>
    </div>

    {/* TOP: THREE COLUMNS */}
    <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-10">
      <div className="pt-16 md:pt-20 lg:pt-24 grid gap-10 md:gap-12 md:grid-cols-3">
        {/* COL 1 */}
        <div>
          <h3 className="text-white font-semibold tracking-tight text-[15px] md:text-[16px] leading-tight">
            Smart Web Presence
          </h3>
          <ul className="mt-3 space-y-2 text-white/75 text-[11px] md:text-[12px] leading-[1.6]">
            {[
              "Real-time apartment availability map",
              "Clickable 3D model interface",
              "Comparison, filtering & online reservation",
            ].map((t, i) => (
              <li key={i} className="flex">
                <span aria-hidden className="mt-[6px] mr-3 inline-block w-[5px] h-[5px] rounded-full bg-white/90" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* COL 2 */}
        <div>
          <h3 className="text-white font-semibold tracking-tight text-[15px] md:text-[16px] leading-tight">
            Digital Twin Technology
          </h3>
          <ul className="mt-3 space-y-2 text-white/75 text-[11px] md:text-[12px] leading-[1.6]">
            {[
              "Real-time apartment status accuracy",
              "Clickable 3D project map",
              "Sunlight & climate simulations",
              "User-based entry & behavior tracking",
              "Automated offer generation",
            ].map((t, i) => (
              <li key={i} className="flex">
                <span aria-hidden className="mt-[6px] mr-3 inline-block w-[5px] h-[5px] rounded-full bg-white/90" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* COL 3 */}
        <div>
          <h3 className="text-white font-semibold tracking-tight text-[15px] md:text-[16px] leading-tight">
            120 Frames of Excellence
          </h3>
          <ul className="mt-3 space-y-2 text-white/75 text-[11px] md:text-[12px] leading-[1.6]">
            {[
              "120 high-quality architectural renders",
              "Floor plans & 3D plan visuals",
              "360° virtual tour & short promotional animation",
            ].map((t, i) => (
              <li key={i} className="flex">
                <span aria-hidden className="mt-[6px] mr-3 inline-block w-[5px] h-[5px] rounded-full bg-white/90" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* BOTTOM: CENTERED TAGLINE */}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-12 z-10">
      <div className="flex items-center gap-[clamp(18px,3vw,40px)]">
        <span
          className="text-white/95"
          style={{  fontSize: "clamp(18px,2.4vw,34px)", letterSpacing: "-0.01em" }}
        >
          One Platform
        </span>
        <span
          aria-hidden
          className="block"
          style={{
            width: "1.25px",
            height: "clamp(26px,3.2vw,46px)",
            background: "linear-gradient(to bottom, rgba(255,255,255,.95), rgba(255,255,255,.75))",
            borderRadius: "1px",
          }}
        />
        <span
          className="text-white/95"
          style={{   fontSize: "clamp(18px,2.4vw,34px)", letterSpacing: "-0.01em" }}
        >
          Infinite Possibilities
        </span>
      </div>
    </div>
  </div>
</SwiperSlide>

      </Swiper>

      {/* pagination bottom-left */}
      <div className="absolute left-28 bottom-6 z-50 pointer-events-auto">
        {/* Give explicit size so Swiper always “sees” it */}
        <div className="hero-pagination inline-flex items-center gap-2 min-w-[48px] min-h-[14px]" />
      </div>
    </section>
  );
}
