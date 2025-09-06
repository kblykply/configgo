// app/components/PropertyShowcase.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "swiper/css";

/* ---------- Types ---------- */
type Project = {
  id: string;
  title: string;
  developer: string;
  city: string;
  image: string; // cover image
  href?: string;
};

type ProjectDetail = {
  description: string;
  slides: Array<{
    title: string;
    image: string;
    caption?: string;
  }>;
};

/* ---------- Sample data ---------- */
const PROJECTS: Project[] = [
  { id: "p1", title: "Vega Center", developer: "NATA Holding", city: "Ankara", image: "/projects/vega.jpg", href: "#" },
  { id: "p2", title: "SheltonVisalia", developer: "Shelton", city: "Ankara", image: "/projects/Shelton.jpg", href: "#" },
  { id: "p3", title: "Paryal Bağlıca", developer: "ZirveBeton", city: "Ankara", image: "/projects/zirve.jpg", href: "#" },
  { id: "p4", title: "VisVadi", developer: "VisVadi", city: "Ankara", image: "/covers/visvadi.jpeg", href: "#" },
  { id: "p6", title: "Ruby Strada", developer: "Vizör", city: "Ankara", image: "/covers/strada.jpg", href: "#" },
  { id: "p7", title: "ONYX Potre", developer: "ONYX", city: "Ankara", image: "/covers/onyx.jpg", href: "#" },
  { id: "p9", title: "Criter Bağlıca", developer: "Criter", city: "Ankara", image: "/covers/criter.jpg", href: "#" },
  { id: "p10", title: "Lagoon", developer: "DND", city: "Cyprus", image: "/covers/laggon.jpg", href: "#" },
  { id: "p11", title: "Mega1453", developer: "Trinvest", city: "Istanbul", image: "/covers/mega1453.jpg", href: "#" },
  { id: "p12", title: "Orion Tower", developer: "Kosavalı", city: "Istanbul", image: "/covers/oriontower.jpg", href: "#" },
  { id: "p13", title: "Suncity 2", developer: "Trinvest", city: "Antalya", image: "/covers/suncity.jpg", href: "#" },
  { id: "p16", title: "Park Rest", developer: "Unknown", city: "Ankara", image: "/covers/prr.jpg", href: "#" },
];

/* Map details per project id (add your real text/images) */
const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  p1: {
    description:
      "Bu proje; kentsel yaşamı akıllı altyapı, yeşil alanlar ve karma kullanımla birleştiren yeni nesil bir yerleşim yaklaşımı sunar. İlk etap; 3 blok, 240 konut ve zemin katta 18 ticari birimden oluşur. Güneye bakan geniş cepheler, rüzgâr ve ışık optimizasyonu için kademeli bir kütleyle çözülmüştür. Sosyal tesislerde kapalı havuz, çok amaçlı salon, çalışma alanları ve 7/24 güvenlik bulunmaktadır. Bağlantı yollarına 3 dk, metroya yürüme mesafesi…",
    slides: [
      { title: "See All Project Details", image: "/Vega/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/Vega/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Pick the Right Apartment", image: "/Vega/select.jpg", caption: "Compare shortlisted options side by side and choose the best fit for your client." },
      { title: "Apartment Interior Tour", image: "/Vega/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "See the Apartment’s View", image: "/Vega/view.png", caption: "Preview the exact panorama from windows and balconies before any site visit." },
      { title: "Sunlight by Hour", image: "/Vega/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/Vega/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/Vega/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/Vega/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Drive-Through Experience", image: "/Vega/drive.jpg", caption: "Explore access roads, parking flows, and drop-off areas by car." },
      { title: "Weather Simulation", image: "/Vega/weather.jpg", caption: "Inspect the project under rain, snow, fog, and clear skies to assess usability." },
      { title: "Nearby Places & Distances", image: "/Vega/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
      { title: "Explore the Floor Plan", image: "/Vega/floorplan.jpg", caption: "Zoom, pan, and highlight rooms, dimensions, and orientation on the apartment plan." },
    ],
  },
  p2: {
    description:
      "ONXY Ankara; premium rezidans ve ofis karmasıyla, şehrin yeni çekim noktası. Esnek planlar, akıllı bina yönetimi ve LEED hedefine uygun malzeme tercihleriyle sürdürülebilir konfor sunar.",
    slides: [
      { title: "See All Project Details", image: "/Shelton/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/Shelton/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Pick the Right Apartment", image: "/Shelton/select.jpg", caption: "Compare shortlisted options side by side and choose the best fit for your client." },
      { title: "Apartment Interior Tour", image: "/Shelton/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "Sunlight by Hour", image: "/Shelton/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/Shelton/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/Shelton/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/Shelton/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Weather Simulation", image: "/Shelton/weather.jpg", caption: "Inspect the project under rain, snow, fog, and clear skies to assess usability." },
      { title: "Nearby Places & Distances", image: "/Shelton/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
    ],
  },
  p3: {
    description:
      "NATA Housing projesi; aile odaklı daire tipleri, ferah balkonlar ve geniş çocuk oyun alanlarıyla öne çıkar. Kapalı otopark ve elektrikli araç şarj istasyonları standarttır.",
    slides: [
      { title: "See All Project Details", image: "/zirve/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/zirve/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Pick the Right Apartment", image: "/zirve/select.jpg", caption: "Compare shortlisted options side by side and choose the best fit for your client." },
      { title: "Apartment Interior Tour", image: "/zirve/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "Sunlight by Hour", image: "/zirve/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/zirve/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/zirve/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/zirve/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Drive-Through Experience", image: "/zirve/drive.jpg", caption: "Explore access roads, parking flows, and drop-off areas by car." },
      { title: "Weather Simulation", image: "/zirve/weather.jpg", caption: "Inspect the project under rain, snow, fog, and clear skies to assess usability." },
      { title: "Nearby Places & Distances", image: "/zirve/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
    ],
  },
  p4: {
    description:
      "Bu proje; kentsel yaşamı akıllı altyapı, yeşil alanlar ve karma kullanımla birleştiren yeni nesil bir yerleşim yaklaşımı sunar. İlk etap; 3 blok, 240 konut ve zemin katta 18 ticari birimden oluşur. Güneye bakan geniş cepheler, rüzgâr ve ışık optimizasyonu için kademeli bir kütleyle çözülmüştür. Sosyal tesislerde kapalı havuz, çok amaçlı salon, çalışma alanları ve 7/24 güvenlik bulunmaktadır. Bağlantı yollarına 3 dk, metroya yürüme mesafesi…",
    slides: [
      { title: "See All Project Details", image: "/visvadi/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/visvadi/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Apartment Interior Tour", image: "/visvadi/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "See the Apartment’s View", image: "/visvadi/view.jpg", caption: "Preview the exact panorama from windows and balconies before any site visit." },
      { title: "Sunlight by Hour", image: "/visvadi/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/visvadi/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/visvadi/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/visvadi/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Drive-Through Experience", image: "/visvadi/drive.jpg", caption: "Explore access roads, parking flows, and drop-off areas by car." },
      { title: "Weather Simulation", image: "/visvadi/weather.jpg", caption: "Inspect the project under rain, snow, fog, and clear skies to assess usability." },
      { title: "Nearby Places & Distances", image: "/visvadi/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
    ],
  },
  p5: {
    description:
      "Bu proje; kentsel yaşamı akıllı altyapı, yeşil alanlar ve karma kullanımla birleştiren yeni nesil bir yerleşim yaklaşımı sunar. İlk etap; 3 blok, 240 konut ve zemin katta 18 ticari birimden oluşur...",
    slides: [
      { title: "See All Project Details", image: "/suare/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/suare/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Pick the Right Apartment", image: "/suare/select.jpg", caption: "Compare shortlisted options side by side and choose the best fit for your client." },
      { title: "Apartment Interior Tour", image: "/suare/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "Sunlight by Hour", image: "/suare/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/suare/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/suare/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/suare/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Nearby Places & Distances", image: "/suare/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
      { title: "Explore the Floor Plan", image: "/suare/floorplan.jpg", caption: "Zoom, pan, and highlight rooms, dimensions, and orientation on the apartment plan." },
    ],
  },
  p13: {
    description:
      "Bu proje; kentsel yaşamı akıllı altyapı, yeşil alanlar ve karma kullanımla birleştiren yeni nesil bir yerleşim yaklaşımı sunar. İlk etap; 3 blok, 240 konut ve zemin katta 18 ticari birimden oluşur. Güneye bakan geniş cepheler, rüzgâr ve ışık optimizasyonu için kademeli bir kütleyle çözülmüştür. Sosyal tesislerde kapalı havuz, çok amaçlı salon, çalışma alanları ve 7/24 güvenlik bulunmaktadır. Bağlantı yollarına 3 dk, metroya yürüme mesafesi…",
    slides: [
      { title: "See All Project Details", image: "/suncity/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/suncity/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Apartment Interior Tour", image: "/suncity/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "See the Apartment’s View", image: "/suncity/view.jpg", caption: "Preview the exact panorama from windows and balconies before any site visit." },
      { title: "Sunlight by Hour", image: "/suncity/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/suncity/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/suncity/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/suncity/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Weather Simulation", image: "/suncity/weather.jpg", caption: "Inspect the project under rain, snow, fog, and clear skies to assess usability." },
      { title: "Nearby Places & Distances", image: "/suncity/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
    ],
  },
    p11: {
    description:
      "Bu proje; kentsel yaşamı akıllı altyapı, yeşil alanlar ve karma kullanımla birleştiren yeni nesil bir yerleşim yaklaşımı sunar. İlk etap; 3 blok, 240 konut ve zemin katta 18 ticari birimden oluşur. Güneye bakan geniş cepheler, rüzgâr ve ışık optimizasyonu için kademeli bir kütleyle çözülmüştür. Sosyal tesislerde kapalı havuz, çok amaçlı salon, çalışma alanları ve 7/24 güvenlik bulunmaktadır. Bağlantı yollarına 3 dk, metroya yürüme mesafesi…",
    slides: [
      { title: "See All Project Details", image: "/mega/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/mega/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Apartment Interior Tour", image: "/mega/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "Sunlight by Hour", image: "/mega/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/mega/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/mega/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/mega/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Weather Simulation", image: "/mega/weather.jpg", caption: "Inspect the project under rain, snow, fog, and clear skies to assess usability." },
      { title: "Nearby Places & Distances", image: "/mega/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
    ],
  },
  p10: {
    description:
      "Bu proje; kentsel yaşamı akıllı altyapı, yeşil alanlar ve karma kullanımla birleştiren yeni nesil bir yerleşim yaklaşımı sunar. İlk etap; 3 blok, 240 konut ve zemin katta 18 ticari birimden oluşur. Güneye bakan geniş cepheler, rüzgâr ve ışık optimizasyonu için kademeli bir kütleyle çözülmüştür. Sosyal tesislerde kapalı havuz, çok amaçlı salon, çalışma alanları ve 7/24 güvenlik bulunmaktadır. Bağlantı yollarına 3 dk, metroya yürüme mesafesi…",
    slides: [
      { title: "See All Project Details", image: "/lagoon/ui.jpg", caption: "Access all architectural and technical information of the project from a single panel" },
      { title: "Filter Apartments", image: "/lagoon/filtre.jpg", caption: "Filter the apartments and choose the apartment that best suits your client." },
      { title: "Apartment Interior Tour", image: "/lagoon/interior-tour.jpg", caption: "Enter a selected apartment and walk through every room with an interactive 3D tour." },
      { title: "See the Apartment’s View", image: "/lagoon/view.png", caption: "Preview the exact panorama from windows and balconies before any site visit." },
      { title: "Sunlight by Hour", image: "/lagoon/sunpath.jpg", caption: "Simulate sun position across the day to analyze light and shade in each room." },
      { title: "Explore Site Amenities", image: "/lagoon/amenities.jpg", caption: "Browse gyms, pools, playgrounds, and shared spaces at a glance." },
      { title: "First-Person (FPS) Site Tour", image: "/lagoon/fps.jpg", caption: "Walk the project from a first-person perspective for immersive exploration." },
      { title: "Third-Person (TPS) Site Tour", image: "/lagoon/tps.jpg", caption: "Navigate the project in third-person view to understand scale and paths." },
      { title: "Drive-Through Experience", image: "/lagoon/drive.jpg", caption: "Explore access roads, parking flows, and drop-off areas by car." },
      { title: "Weather Simulation", image: "/lagoon/weather.jpg", caption: "Inspect the project under rain, snow, fog, and clear skies to assess usability." },
      { title: "Nearby Places & Distances", image: "/lagoon/nearby.jpg", caption: "See schools, malls, transit, and estimated travel times from the project." },
    ],
  },
};

/* ---------- Component ---------- */
export default function PropertyShowcase() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  const opts = useMemo(
    () => ({
      modules: [Navigation, Keyboard],
      slidesPerView: 1.15,
      spaceBetween: 18,
      centeredSlides: true as const,
      speed: 600,
      keyboard: { enabled: true, onlyInViewport: true } as const,
      breakpoints: {
        640: { slidesPerView: 1.4, spaceBetween: 20 },
        768: { slidesPerView: 2.1, spaceBetween: 22 },
        1024: { slidesPerView: 2.6, spaceBetween: 24 },
        1280: { slidesPerView: 3.1, spaceBetween: 26 },
      },
      onSlideChange: (sw: any) => setActive(sw.realIndex),
      navigation: { prevEl: prevRef.current, nextEl: nextRef.current } as any,
      onBeforeInit: (sw: any) => {
        sw.params.navigation.prevEl = prevRef.current;
        sw.params.navigation.nextEl = nextRef.current;
      },
    }),
    []
  );

  return (
    <section aria-label="3D Property Showcase" className="relative w-full bg-[#000000] py-12 md:py-16">
      <div className="mx-auto max-w-[1450px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <p className="typo-small-heading text-white/60">Projects</p>
          <h2 className="typo-h2-md mt-2 text-white">Our Archviz Projects</h2>
        </div>

        {/* Slider */}
        <div className="relative">
          <button
            ref={prevRef}
            aria-label="Previous"
            className="absolute left-[-8px] md:left-[-18px] top-1/2 z-20 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full border border-lime-300/70 bg-black/70 backdrop-blur-sm text-lime-300 hover:bg-black/90 transition focus:outline-none focus:ring-2 focus:ring-lime-300/60"
          >
            <Chevron className="-rotate-180" />
          </button>

          <button
            ref={nextRef}
            aria-label="Next"
            className="absolute right-[-8px] md:right-[-18px] top-1/2 z-20 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full border border-lime-300/70 bg-black/70 backdrop-blur-sm text-lime-300 hover:bg-black/90 transition focus:outline-none focus:ring-2 focus:ring-lime-300/60"
          >
            <Chevron />
          </button>

          <Swiper {...opts}>
            {PROJECTS.map((p, i) => (
              <SwiperSlide key={p.id}>
                <Card project={p} active={i === active} onClick={() => setOpenId(p.id)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* soft halo */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_100%_at_50%_-10%,rgba(255,255,255,0.08),transparent_55%)]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />

      {/* Modal */}
      <AnimatePresence>
        {openId && (
          <ProjectModal
            project={PROJECTS.find((p) => p.id === openId)!}
            details={PROJECT_DETAILS[openId]}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Card ---------- */
function Card({ project, active, onClick }: { project: Project; active: boolean; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      role="button"
      aria-label={`${project.title} detaylarını aç`}
      className={[
        "relative overflow-hidden rounded-2xl border cursor-pointer group",
        "border-white/10 bg-neutral-900/10",
        "transition-transform duration-500 ease-out",
        active ? "scale-[1.02] shadow-[0_20px_80px_rgba(185,255,0,0.12)]" : "scale-[0.96] opacity-90",
      ].join(" ")}
      style={{ aspectRatio: "4/5" }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(min-width: 1280px) 380px, (min-width: 768px) 44vw, 85vw"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <h3 className="font-heading text-white text-[18px] md:text-[20px] leading-none mb-3">{project.title}</h3>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge icon={<BuildingIcon />}>{project.developer}</Badge>
          <Badge icon={<PinIcon />}>{project.city}</Badge>
        </div>
        <span className="inline-flex items-center gap-2 rounded-md bg-[#B9FF00] px-3.5 py-1.5 text-[12px] font-medium text-black transition group-hover:brightness-95">
          See Details
        </span>
      </div>
    </article>
  );
}

/* ---------- Modal (new “cinema style”) ---------- */
function ProjectModal({
  project,
  details,
  onClose,
}: {
  project: Project;
  details: ProjectDetail | undefined;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0); // includes description slide at index 0

  // lock background scroll properly
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!details) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop (close on click) */}
      <motion.div
        ref={backdropRef}
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onMouseDown={(e) => {
          if (e.currentTarget === e.target) onClose();
        }}
      />

      {/* Shell */}
      <motion.div
        className="relative z-10 w-[min(98vw,1280px)] max-h-[92vh] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_20px_120px_rgba(0,0,0,.65)] backdrop-blur-xl"
        initial={{ y: 20, scale: 0.97, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: 10, scale: 0.98, opacity: 0, filter: "blur(6px)" }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.6 }}
      >
        {/* Top bar (glass) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute right-3 top-3 z-20">
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 text-white hover:bg-black/70 transition"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-12">
          {/* Media */}
          <div className="relative md:col-span-8">
            <Swiper
              modules={[Navigation, Keyboard]}
              keyboard={{ enabled: true }}
              onSwiper={(sw) => (swiperRef.current = sw)}
              onSlideChange={(sw) => setSlideIdx(sw.realIndex)}
              className="h-[60vh] sm:h-[62vh] md:h-[64vh]"
            >
              {/* Description slide (0) */}
              <SwiperSlide>
                <div className="relative h-full">
                  <Image src={project.image} alt="" fill className="object-cover opacity-35" sizes="100vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
                  <div className="relative z-10 flex h-full items-end">
                    <div className="w-full p-5 sm:p-6">
                      <div className="max-w-[800px]">
                        <div className="mb-1 text-xs uppercase tracking-wide text-white/70">Project</div>
                        <h3 className="text-white text-xl sm:text-2xl font-semibold">{project.title}</h3>
                        <p className="mt-3 text-white/85 leading-relaxed">{details.description}</p>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/80">
                          <InfoChip label="Developer" value={project.developer} />
                          <InfoChip label="City" value={project.city} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Gallery slides (1..n) */}
              {details.slides.map((s, idx) => (
                <SwiperSlide key={s.image}>
                  <div className="relative h-full">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover"
                      priority={idx < 1}
                      onClick={() => setLightboxIndex(idx)} // open lightbox at this image
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/85">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B9FF00]" />
                        {idx + 1} / {details.slides.length}
                      </div>
                      <h5 className="mt-2 text-white text-lg sm:text-xl font-semibold">{s.title}</h5>
                      {s.caption && <p className="text-white/80 text-sm mt-1">{s.caption}</p>}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumb strip */}
            <div className="relative border-t border-white/10 bg-black/40">
              <div className="no-scrollbar flex gap-2 overflow-x-auto p-3">
                {/* description thumb */}
                <Thumb
                  active={slideIdx === 0}
                  label="Info"
                  onClick={() => swiperRef.current?.slideTo(0)}
                />
                {details.slides.map((s, i) => (
                  <Thumb
                    key={s.image}
                    active={slideIdx === i + 1}
                    image={s.image}
                    label={`${i + 1}`}
                    onClick={() => swiperRef.current?.slideTo(i + 1)}
                  />
                ))}
              </div>
            </div>

            {/* Fullscreen hint */}
            <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden sm:block">
              <div className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] text-white/80">
                Click image to open fullscreen
              </div>
            </div>

            {/* Lightbox (customized bg) */}
            <Lightbox
              open={lightboxIndex !== null}
              close={() => setLightboxIndex(null)}
              index={lightboxIndex ?? 0}
              slides={details.slides.map((s) => ({ src: s.image }))}
              controller={{ closeOnBackdropClick: true }}
              styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
            />
          </div>

          {/* Right info rail */}
          <div className="flex min-h-0 flex-col md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.05]">
            <div className="flex-1 overflow-auto p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/85">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B9FF00]" />
                Overview
              </div>
              <h4 className="mt-2 text-white text-base sm:text-lg font-medium">{project.title}</h4>

              <ul className="mt-4 space-y-2 text-sm text-white/85">
                <li className="flex items-start gap-2"><Dot />Developer: <span className="ml-1 text-white/90">{project.developer}</span></li>
                <li className="flex items-start gap-2"><Dot />City: <span className="ml-1 text-white/90">{project.city}</span></li>
                <li className="flex items-start gap-2"><Dot />Status: <span className="ml-1 text-white/90">Active</span></li>
              </ul>

              <a
                href={project.href ?? "#"}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#B9FF00] text-black text-sm font-semibold px-4 py-2 hover:brightness-95 transition"
              >
                See Full Details
              </a>

              <p className="mt-3 text-white/60 text-xs">
                Ok tuşlarıyla slaytlar arasında gezinebilir, <span className="text-white">Esc</span> ile kapatabilirsiniz.
              </p>
            </div>

            {/* bottom subtle system bar */}
            <div className="border-t border-white/10 bg-black/30 px-5 py-3 text-[11px] text-white/65">
              Tip: Use thumbnails to jump between slides.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Small bits ---------- */
function Thumb({
  image,
  label,
  active,
  onClick,
}: {
  image?: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "group relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition",
        active ? "border-[#B9FF00] ring-2 ring-[#B9FF00]/30" : "border-white/15 hover:border-white/30",
      ].join(" ")}
      title={label}
    >
      {image ? (
        <Image src={image} alt={label} fill sizes="80px" className="object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center bg-white/5 text-[11px] text-white/80">Info</div>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </button>
  );
}

function Badge({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-white/8 px-2.5 py-1 text-[12px] text-white/90 backdrop-blur-sm border border-white/10">
      <span className="opacity-90">{icon}</span>
      {children}
    </span>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/15 bg-black/30 px-3 py-2 backdrop-blur-sm">
      <p className="text-white/60 text-[10px] uppercase tracking-wide">{label}</p>
      <p className="text-white/90 text-xs mt-0.5">{value}</p>
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function Dot() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 21h18M6 21V7a1 1 0 0 1 1-1h6v15M10 10h2M10 13h2M10 16h2M7 10h2M7 13h2M7 16h2M14 10h2M14 13h2M14 16h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s7-6.16 7-12a7 7 0 1 0-14 0c0 5.84 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
