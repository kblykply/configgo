// app/components/configgo/ConfiggoInventory.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  Layers3,
  Home,
  Filter,
  Tag,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock3,
  Percent,
} from "lucide-react";

type Status = "Available" | "On Hold" | "Sold";
type Unit = {
  id: string;
  project: string;
  building: string; // e.g. "A", "B"
  unitNo: string;   // e.g. "A-12"
  type: "1+1" | "2+1" | "3+1";
  floor: number;
  size: number;     // m²
  price: number;    // USD
  status: Status;
  discount?: number; // %
};

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};

const DEFAULT_UNITS: Unit[] = [
  { id: "u1",  project: "Vega Center", building: "A", unitNo: "A-12", type: "2+1", floor: 5,  size: 96, price: 235000, status: "Available", discount: 3 },
  { id: "u2",  project: "Vega Center", building: "A", unitNo: "A-15", type: "1+1", floor: 6,  size: 62, price: 162000, status: "On Hold" },
  { id: "u3",  project: "Vega Center", building: "A", unitNo: "A-18", type: "3+1", floor: 9,  size: 128, price: 312000, status: "Sold" },
  { id: "u4",  project: "Vega Center", building: "B", unitNo: "B-03", type: "1+1", floor: 1,  size: 58, price: 149000, status: "Available" },
  { id: "u5",  project: "Vega Center", building: "B", unitNo: "B-06", type: "2+1", floor: 2,  size: 92, price: 224000, status: "Available" },
  { id: "u6",  project: "Vega Center", building: "B", unitNo: "B-09", type: "3+1", floor: 3,  size: 132, price: 329000, status: "On Hold", discount: 2 },
  { id: "u7",  project: "Vega Center", building: "C", unitNo: "C-11", type: "2+1", floor: 4,  size: 94, price: 229000, status: "Available" },
  { id: "u8",  project: "Vega Center", building: "C", unitNo: "C-14", type: "1+1", floor: 5,  size: 60, price: 158000, status: "Sold" },
  { id: "u9",  project: "Vega Center", building: "C", unitNo: "C-17", type: "3+1", floor: 7,  size: 130, price: 318000, status: "Available" },
  { id: "u10", project: "Vega Center", building: "C", unitNo: "C-18", type: "2+1", floor: 8,  size: 98, price: 241000, status: "Available", discount: 5 },
  { id: "u11", project: "Vega Center", building: "A", unitNo: "A-05", type: "1+1", floor: 2,  size: 57, price: 146000, status: "Available" },
  { id: "u12", project: "Vega Center", building: "B", unitNo: "B-12", type: "2+1", floor: 5,  size: 96, price: 236000, status: "Sold" },
];

export default function ConfiggoInventory({
  units = DEFAULT_UNITS,
}: { units?: Unit[] }) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show"); else controls.set("hidden");
  }, [inView, controls]);

  const [type, setType] = useState<"All" | "1+1" | "2+1" | "3+1">("All");
  const [onlyAvail, setOnlyAvail] = useState(true);
  const [sort, setSort] = useState<"price" | "size" | "floor">("price");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = [...units];
    if (type !== "All") list = list.filter((u) => u.type === type);
    if (onlyAvail) list = list.filter((u) => u.status === "Available" || u.status === "On Hold");
    list.sort((a, b) => (a[sort] as number) - (b[sort] as number));
    return list;
  }, [units, type, onlyAvail, sort]);

  const buildings = useMemo(
    () => Array.from(new Set(filtered.map((u) => u.building))).sort(),
    [filtered]
  );

  function toggleSelect(id: string, status: Status) {
    if (status === "Sold") return; // can't select sold
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

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
          {/* LEFT — copy & controls */}
          <motion.aside variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5">
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Manage availability in real time. Hold units during negotiations, apply discounts,
              and filter by typology in one click. Export or bulk update when pricing changes.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: Building2, txt: "Project → building → unit hierarchy" },
                { Icon: Layers3,   txt: "Holds & reservations with expiry" },
                { Icon: DollarSign,txt: "Dynamic pricing with bulk updates" },
                { Icon: Tag,       txt: "Discounts & promos per unit type" },
              ].map(({ Icon, txt }) => (
                <motion.li key={txt} variants={ITEM} className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-[#C6F24E]" />
                  </div>
                  <span className="typo-small text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Controls */}
            <motion.div variants={ITEM} className="mt-8 space-y-5">
              {/* type filter chips */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
                  <Filter className="h-3.5 w-3.5" /> Quick filters
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["All", "1+1", "2+1", "3+1"] as const).map((t) => {
                    const active = type === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={[
                          "rounded-full px-3 py-1.5 text-xs border transition",
                          active
                            ? "bg-[#C6F24E] text-black border-transparent"
                            : "bg-white/[0.06] text-white/85 border-white/10 hover:bg-white/[0.10]",
                        ].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* toggles & sort */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-white/80">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#C6F24E]"
                    checked={onlyAvail}
                    onChange={(e) => setOnlyAvail(e.target.checked)}
                  />
                  Only available / on-hold
                </label>

                <div className="ml-auto">
                  <label className="mr-2 text-xs text-white/60">Sort</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as any)}
                    className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/90 outline-none focus:border-white/20"
                  >
                    <option value="price">Price (low → high)</option>
                    <option value="size">Size (m²)</option>
                    <option value="floor">Floor</option>
                  </select>
                </div>
              </div>

              {/* legend */}
              <div className="mt-5 grid grid-cols-3 gap-3 text-[11px] text-white/75">
                <div className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C6F24E]" />
                  Available
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  On Hold
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  Sold
                </div>
              </div>

              {/* selection actions (demo) */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/80">
                    Selected: <span className="text-white">{selected.length}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={!selected.length}
                      className={[
                        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs transition border",
                        selected.length
                          ? "bg-[#C6F24E] text-black border-transparent"
                          : "cursor-not-allowed bg-white/5 text-white/35 border-white/10",
                      ].join(" ")}
                      onClick={() => alert(`Demo: apply -2% discount to ${selected.length} unit(s).`)}
                    >
                      <Percent className="h-3.5 w-3.5" /> Apply -2%
                    </button>
                    <button
                      disabled={!selected.length}
                      className={[
                        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs transition border",
                        selected.length
                          ? "bg-white/10 text-white border-white/15 hover:bg-white/15"
                          : "cursor-not-allowed bg-white/5 text-white/35 border-white/10",
                      ].join(" ")}
                      onClick={() => setSelected([])}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.aside>

          {/* RIGHT — inventory grid visual */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 text-xs text-white/60">Vega Center · Live Availability</div>
              </div>

              <div className="relative aspect-[16/9] p-4 md:p-5">
                {/* buildings tabs (read-only badges for demo) */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-white/60">Buildings:</span>
                  {buildings.map((b) => (
                    <span key={b} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85">
                      {b}
                    </span>
                  ))}
                </div>

                {/* grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((u, i) => {
                    const isSelected = selected.includes(u.id);
                    const sold = u.status === "Sold";
                    const hold = u.status === "On Hold";
                    return (
                      <motion.button
                        key={u.id}
                        onClick={() => toggleSelect(u.id, u.status)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 0.04 * i } }}
                        className={[
                          "relative overflow-hidden rounded-xl border p-3 text-left transition",
                          "shadow-[0_12px_28px_rgba(0,0,0,0.35)]",
                          isSelected
                            ? "border-[#C6F24E]/60 bg-[#C6F24E]/10"
                            : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]",
                          sold ? "pointer-events-none opacity-60" : "",
                        ].join(" ")}
                      >
                        {/* top row */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{u.unitNo}</span>
                          <span
                            className={[
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]",
                              u.status === "Available" && "bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30",
                              u.status === "On Hold"  && "bg-amber-300/15 text-amber-300 ring-1 ring-amber-300/30",
                              u.status === "Sold"     && "bg-red-400/15 text-red-300 ring-1 ring-red-400/30",
                            ].filter(Boolean).join(" ")}
                          >
                            {u.status === "Available" && <CheckCircle2 className="h-3.5 w-3.5" />}
                            {u.status === "On Hold"  && <Clock3 className="h-3.5 w-3.5" />}
                            {u.status === "Sold"     && <XCircle className="h-3.5 w-3.5" />}
                            {u.status}
                          </span>
                        </div>

                        {/* meta */}
                        <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                          <Home className="h-4 w-4 text-[#C6F24E]" />
                          {u.type} · {u.size} m² · Floor {u.floor}
                        </div>

                        {/* price / discount */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-white">{fmt(u.price)}</div>
                          {u.discount ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/85">
                              <Tag className="h-3.5 w-3.5 text-[#C6F24E]" /> -{u.discount}%
                            </span>
                          ) : <span />}
                        </div>

                        {/* overlay for sold */}
                        {sold && (
                          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.04),rgba(255,255,255,0.04)_8px,transparent_8px,transparent_16px)]" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

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
