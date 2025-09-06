// app/components/configgo/ConfiggoDocuments.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FileText,
  FileSignature,
  Stamp,
  Send,
  Eye,
  Download,
  Tag,
  DollarSign,
  Building2,
  Home,
  User,
  CalendarClock,
  CheckCircle2,
  ShieldCheck,
  History,
} from "lucide-react";

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

export default function ConfiggoDocuments() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  // demo state (offer builder)
  const [project] = useState("Vega Center");
  const [unit] = useState("A-12 · 2+1 · 96 m²");
  const [buyer] = useState("Mert Mutlu");
  const [price, setPrice] = useState<number>(235000);
  const [discount, setDiscount] = useState<number>(3);
  const total = useMemo(() => Math.round(price * (1 - discount / 100)), [price, discount]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <section ref={ref} className="relative" id="docs-esign">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Documents, offers & e-sign
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Generate <span className="text-[#C6F24E]">offers</span>, send <span className="text-[#C6F24E]">packs</span>, track <span className="text-[#C6F24E]">signatures</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — value & bullets */}
          <motion.aside variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5">
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Create branded quotes and offer packs in seconds. Pull live unit data, apply discounts,
              send for e-signature, and get a complete audit trail mapped to the deal.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: FileText,      txt: "Branded quotes & multi-doc packs (PDF)" },
                { Icon: DollarSign,    txt: "Live pricing & automatic totals" },
                { Icon: Tag,           txt: "Discount rules, approvals & expiry" },
                { Icon: FileSignature, txt: "E-sign with signer order & reminders" },
                { Icon: ShieldCheck,   txt: "Audit trail with timestamp & IP" },
              ].map(({ Icon, txt }) => (
                <motion.li key={txt} variants={ITEM} className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-[#C6F24E]" />
                  </div>
                  <span className="typo-small text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* tiny safety note */}
            <motion.div variants={ITEM} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <History className="h-4 w-4 text-[#C6F24E]" />
                All versions are stored; revert anytime. Signed PDFs are sealed and checksum-verified.
              </div>
            </motion.div>
          </motion.aside>

          {/* RIGHT — offer builder + preview + e-sign status */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 text-xs text-white/60">Offer · Vega Center</div>
              </div>

              <div className="relative aspect-[16/9] grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6">
                {/* Offer form */}
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
                    <Stamp className="h-4 w-4 text-[#C6F24E]" /> Offer builder
                  </div>

                  <Field icon={<Building2 className="h-4 w-4 text-[#C6F24E]" />} label="Project" value={project} />
                  <Field icon={<Home className="h-4 w-4 text-[#C6F24E]" />} label="Unit" value={unit} />
                  <Field icon={<User className="h-4 w-4 text-[#C6F24E]" />} label="Buyer" value={buyer} />

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <NumberField
                      label="Price"
                      value={price}
                      onChange={(v) => setPrice(v)}
                      prefix="$"
                    />
                    <NumberField
                      label="Discount"
                      value={discount}
                      onChange={(v) => setDiscount(v)}
                      suffix="%"
                      min={0}
                      max={20}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                    <div className="text-xs text-white/60">Total after discount</div>
                    <div className="text-sm font-[600] text-[#C6F24E]">{fmt(total)}</div>
                  </div>

                  {/* actions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-lg bg-[#C6F24E] px-3 py-2 text-sm text-black hover:brightness-95"
                      onClick={() => alert("Demo: Offer PDF generated")}
                    >
                      <FileText className="h-4 w-4" /> Generate PDF
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15"
                      onClick={() => alert("Demo: Offer sent for e-sign")}
                    >
                      <Send className="h-4 w-4" /> Send for e-sign
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15"
                      onClick={() => alert("Demo: PDF downloaded")}
                    >
                      <Download className="h-4 w-4" /> Download
                    </button>
                  </div>

                  {/* pack selection */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/80">
                    <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#C6F24E]" /> Offer letter
                    </label>
                    <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#C6F24E]" /> Payment plan
                    </label>
                    <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#C6F24E]" /> Contract draft
                    </label>
                    <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <input type="checkbox" className="h-4 w-4 accent-[#C6F24E]" /> ID/Passport
                    </label>
                  </div>
                </div>

                {/* Preview + e-sign timeline */}
                <div className="flex flex-col gap-4">
                  {/* preview */}
                  <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-sm text-white/80">Offer — {buyer}</div>
                      <button className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs text-white/85 hover:bg-white/15">
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </button>
                    </div>
                    {/* faux PDF */}
                    <div className="relative h-full w-full p-4">
                      <div className="h-full w-full rounded-lg bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] ring-1 ring-white/10" />
                      <div className="pointer-events-none absolute inset-0 p-4">
                        <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/70 ring-1 ring-white/10">
                          <div>Offer to: <span className="text-white/90">{buyer}</span></div>
                          <div>Unit: {unit}</div>
                          <div>Total: <span className="text-[#C6F24E] font-[600]">{fmt(total)}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* e-sign status */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
                      <FileSignature className="h-4 w-4 text-[#C6F24E]" />
                      E-sign status
                    </div>
                    <ul className="space-y-3">
                      {[
                        { t: "14:12", e: "Offer sent to buyer", done: true },
                        { t: "14:19", e: "Viewed by buyer", done: true },
                        { t: "14:33", e: "Signed by buyer", done: true },
                        { t: "14:35", e: "Counter-sign by developer", done: false },
                      ].map((row, i) => (
                        <motion.li
                          key={row.t + row.e}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 0.05 * i } }}
                          className="flex items-start gap-3 text-xs"
                        >
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                            {row.done ? (
                              <CheckCircle2 className="h-4 w-4 text-[#C6F24E]" />
                            ) : (
                              <CalendarClock className="h-4 w-4 text-white/70" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-white/85">{row.e}</div>
                            <div className="text-white/40">{row.t}</div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 md:rounded-xl" />
              </div>
            </div>

            <p className="typo-small mt-4 text-white/60">
              Templates auto-fill project & unit fields. Signers get reminders; signed PDFs are sealed and logged to the deal.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------- tiny form helpers ------------- */
function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="mt-2">
      <div className="mb-1 text-xs text-white/60">{label}</div>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90">
        {icon}
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}

function NumberField({
  label, value, onChange, prefix, suffix, min, max,
}: {
  label: string; value: number;
  onChange: (v: number) => void;
  prefix?: string; suffix?: string; min?: number; max?: number;
}) {
  return (
    <div>
      <div className="mb-1 text-xs text-white/60">{label}</div>
      <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.05] px-2 py-2 text-sm text-white/90">
        {prefix && <span className="mr-1 opacity-70">{prefix}</span>}
        <input
          type="number"
          className="w-full bg-transparent outline-none"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        {suffix && <span className="ml-1 opacity-70">{suffix}</span>}
      </div>
    </div>
  );
}
