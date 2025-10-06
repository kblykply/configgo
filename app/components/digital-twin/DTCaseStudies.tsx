// app/components/digital-twin/DTCaseStudies.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Building2,
  ArrowUpRight,
  ChevronDown,
  X,
} from "lucide-react";

export type Project = {
  id: string;
  title: string;
  developer: string;
  city: string;
  image: string;
  href: string;
};

type Props = { projects?: Project[] };





/* ---------- Data (yours) ---------- */
const DEFAULT_PROJECTS: Project[] = [
  { id: "p1", title: "Vega Center", developer: "NATA Holding", city: "Ankara", image: "/projects/vega.jpg", href: "#" },
  { id: "p2", title: "SheltonVisalia", developer: "Shelton", city: "Ankara", image: "/projects/Shelton.jpg", href: "#" },
  { id: "p3", title: "Paryal Bağlıca", developer: "ZirveBeton", city: "Ankara", image: "/projects/zirve.jpg", href: "#" },
  { id: "p4", title: "VisVadi", developer: "VisVadi", city: "Ankara", image: "/covers/visvadi.jpg", href: "#" },
  { id: "p5", title: "Suare", developer: "Suare", city: "Ankara", image: "/covers/visvadi.jpg", href: "#" },
  { id: "p6", title: "Ruby Strada", developer: "Vizör", city: "Ankara", image: "/covers/strada.jpg", href: "#" },
  { id: "p7", title: "ONYX Potre", developer: "ONYX", city: "Ankara", image: "/covers/onyx.jpg", href: "#" },
  { id: "p9", title: "Criter Bağlıca", developer: "Criter", city: "Ankara", image: "/covers/criter.jpg", href: "#" },
  { id: "p10", title: "Lagoon", developer: "DND", city: "Cyprus", image: "/covers/laggon.jpg", href: "#" },
  { id: "p11", title: "Mega1453", developer: "Trinvest", city: "Ankara", image: "/covers/mega1453.jpg", href: "#" },
  { id: "p12", title: "Orion Tower", developer: "Kosavalı", city: "Ankara", image: "/covers/oriontower.jpg", href: "#" },
  { id: "p13", title: "Suncity 2", developer: "Trinvest", city: "Antalya", image: "/covers/suncity.jpg", href: "#" },
  { id: "p16", title: "Park Rest", developer: "Elite", city: "Cyprus", image: "/covers/prr.jpg", href: "#" },
];

/* ---------- Variants ---------- */
type Bezier = [number, number, number, number];
const EASE: Bezier = [0.22, 0.61, 0.36, 1];
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};
const CARD = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

/* ---------- Component ---------- */
export default function DTCaseStudies({ projects = DEFAULT_PROJECTS }: Props) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState<string>("All");
  const [sort, setSort] = useState<"title" | "city" | "developer">("title");
  const [show, setShow] = useState(9); // load-more
  const [focus, setFocus] = useState<Project | null>(null); // quick view

  // derived data
  const cities = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.city)))],
    [projects]
  );

  const filtered = useMemo(() => {
    let list = projects.filter((p) =>
      [p.title, p.developer, p.city].join(" ").toLowerCase().includes(q.toLowerCase())
    );
    if (city !== "All") list = list.filter((p) => p.city === city);

    list.sort((a, b) => {
      const ka = (sort === "title" ? a.title : sort === "city" ? a.city : a.developer).toLowerCase();
      const kb = (sort === "title" ? b.title : sort === "city" ? b.city : b.developer).toLowerCase();
      return ka.localeCompare(kb, "tr");
    });
    return list;
  }, [projects, q, city, sort]);

  const featured = filtered[0];
  const rest = filtered.slice(1, show);

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-18 md:py-24">
        {/* Header + sticky controls */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4 md:pr-4 md:sticky md:top-[calc(var(--header-h,72px)+24px)] self-start">
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
              <motion.div variants={CARD} className="mb-4">
                <p className="typo-small-heading text-white/70">Case Studies</p>
                <h2 className="typo-h2-md mt-2">
                  <span className="text-[#C6F24E]">Projects</span> We’ve Brought To Life
                </h2>
                <p className="typo-small mt-2 text-white/65">
                  Browse our recent digital-twin launches. Filter by city, search, and open a quick view for details.
                </p>
              </motion.div>

              {/* Search */}
              <motion.div variants={CARD} className="relative mt-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by title, developer, city…"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] pl-10 pr-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-white/20"
                />
              </motion.div>

              {/* City chips */}
              <motion.div variants={CARD} className="mt-5">
                <div className="mb-2 flex items-center gap-2 text-white/60 text-xs">
                  <Filter className="h-3.5 w-3.5" /> Filters
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => {
                    const active = c === city;
                    return (
                      <button
                        key={c}
                        onClick={() => setCity(c)}
                        className={[
                          "rounded-full px-3 py-1.5 text-xs border transition",
                          active
                            ? "bg-[#C6F24E] text-black border-transparent"
                            : "bg-white/[0.06] text-white/80 border-white/10 hover:bg-white/[0.10]",
                        ].join(" ")}
                      >
                        {c}
                      </button>
                    );
                  })}
                  {city !== "All" || q ? (
                    <button
                      onClick={() => {
                        setCity("All");
                        setQ("");
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.1]"
                    >
                      <X className="h-3.5 w-3.5" /> Clear
                    </button>
                  ) : null}
                </div>
              </motion.div>

              {/* Sort */}
              <motion.div variants={CARD} className="mt-5">
                <label className="mb-1 block text-xs text-white/60">Sort by</label>
                <div className="relative">
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as any)}
                    className="w-full appearance-none rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90 outline-none focus:border-white/20"
                  >
                    <option value="title">Title (A–Z)</option>
                    <option value="city">City (A–Z)</option>
                    <option value="developer">Developer (A–Z)</option>
                  </select>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={CARD} className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Showing</span>
                  <span className="text-white">{Math.min(filtered.length, Math.max(0, show))}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-white/70">Total</span>
                  <span className="text-white">{filtered.length}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side: Featured + Grid */}
          <div className="md:col-span-8">
            {/* Featured banner */}
            {featured && (
              <motion.div
                variants={WRAP}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                className="mb-8"
              >
                <motion.div variants={CARD} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                  <div className="relative aspect-[21/9]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1024px) 900px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-6 md:p-8 flex items-end">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-[#C6F24E] px-2.5 py-0.5 text-[10px] font-medium text-black/90">
                            Featured
                          </span>
                          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] text-white/85">
                            {featured.city}
                          </span>
                          <span className="text-[11px] text-white/60">•</span>
                          <span className="text-[11px] text-white/75">{featured.developer}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-[500] text-white">{featured.title}</h3>
                        <div className="mt-3 flex gap-3">
                          <Link
                            href={featured.href || "#"}
                            className="inline-flex items-center gap-1 rounded-full bg-[#C6F24E] px-4 py-2 text-sm text-black transition hover:brightness-95"
                          >
                            Open Project <ArrowUpRight className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setFocus(featured)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/15"
                          >
                            Quick View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Grid */}
            <motion.ul
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {rest.map((p) => (
                <motion.li key={p.id} variants={CARD}>
                  <ProjectCard p={p} onQuick={() => setFocus(p)} />
                </motion.li>
              ))}
            </motion.ul>

            {/* Load more */}
            {show < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShow((s) => s + 6)}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/15"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick view modal */}
      <AnimatePresence>
        {focus && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setFocus(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE } }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="absolute left-1/2 top-1/2 w-[min(920px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9]">
                <Image src={focus.image} alt={focus.title} fill className="object-cover" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 text-sm text-white/75">
                  <MapPin className="h-4 w-4 text-[#C6F24E]" />
                  {focus.city}
                  <span className="text-white/40">•</span>
                  <Building2 className="h-4 w-4 text-[#C6F24E]" />
                  {focus.developer}
                </div>
                <h3 className="mt-2 text-2xl font-[500] text-white">{focus.title}</h3>
                <div className="mt-4 flex gap-3">
                  <Link
                    href={focus.href || "#"}
                    className="inline-flex items-center gap-1 rounded-full bg-[#C6F24E] px-4 py-2 text-sm text-black transition hover:brightness-95"
                  >
                    Open Project <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setFocus(null)}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Card subcomponent ---------- */
function ProjectCard({ p, onQuick }: { p: Project; onQuick: () => void }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition">
      <div className="relative aspect-[16/11]">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        <div className="absolute left-0 top-0 m-3 flex gap-2">
          <span className="rounded-full bg-[#C6F24E] px-2.5 py-0.5 text-[10px] font-medium text-black/90">{p.city}</span>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] text-white/85">{p.developer}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <h3 className="font-[500] text-white">{p.title}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <Link
          href={p.href || "#"}
          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs text-white/90 backdrop-blur-sm transition hover:bg-white/15"
        >
          Open <ArrowUpRight className="h-4 w-4" />
        </Link>
        <button
          onClick={onQuick}
          className="text-xs text-white/80 hover:text-white/95 underline underline-offset-4"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}
