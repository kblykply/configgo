"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Rocket, Upload, FileSpreadsheet, Database, Settings2, CalendarDays,
  UserCheck, ShieldCheck, LifeBuoy, CheckCircle2, ServerCog, ClipboardList, ArrowRight
} from "lucide-react";

/** Animations */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const HEADER_OFFSET = "clamp(72px, 16vh, 128px)"; // reserve space for your fixed header

export default function ConfiggoImplementation() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  return (
    <section
      ref={ref}
      id="implementation"
      className="relative"
      style={{ paddingTop: HEADER_OFFSET, scrollMarginTop: HEADER_OFFSET }}
    >
      {/* visible glow so you can tell it rendered */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_0%,rgba(198,242,78,0.08),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 pb-16 md:pb-24">
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-8 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">Implementation & Migration</motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Go live in <span className="text-[#C6F24E]">weeks</span>, not months
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-3 max-w-[860px] mx-auto text-white/70">
            Bring your data, connect your channels, and launch with confidence. We handle mapping, validation, and training.
          </motion.p>
        </motion.div>

        <motion.div variants={WRAP} initial="hidden" animate={controls} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
          {/* Left: migration paths */}
          <motion.div variants={ITEM} className="md:col-span-5 space-y-4">
            <Card icon={<FileSpreadsheet className="h-4 w-4 text-[#C6F24E]" />} title="From spreadsheets">
              Auto-map columns, normalize phones/emails, merge duplicates safely.
            </Card>
            <Card icon={<Database className="h-4 w-4 text-[#C6F24E]" />} title="From a legacy CRM">
              Preserve IDs & history; remap pipelines and owners during import.
            </Card>
            <Card icon={<Settings2 className="h-4 w-4 text-[#C6F24E]" />} title="From your site & ads">
              Hook up forms & ad sources; enrich with UTM/device and route by office/project.
            </Card>
          </motion.div>

          {/* Right: import wizard teaser (simple) */}
          <motion.div variants={ITEM} className="md:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Upload className="h-4 w-4 text-[#C6F24E]" />
                  Import wizard — Leads.csv
                </div>
                <span className="text-xs text-white/60">Step 2 • Map fields</span>
              </div>
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6">
                <Panel title="Preview (first rows)">
                  <pre className="max-h-[220px] overflow-auto rounded-lg bg-black/60 p-3 text-[12px] leading-relaxed ring-1 ring-white/10">
{`full_name,email,phone,project,interest,source
Mert Mutlu,mert@example.com,+90 555 123 4567,Vega Center,2+1,Meta Ads
Jane Doe,jane@example.com,+90 555 987 6543,Orion Tower,1+1,Web Form`}
                  </pre>
                </Panel>
                <Panel title="Map to Configgo fields">
                  <div className="overflow-hidden rounded-lg ring-1 ring-white/10">
                    <table className="w-full table-fixed">
                      <colgroup><col style={{width:"50%"}}/><col style={{width:"50%"}}/></colgroup>
                      <thead className="bg-white/[0.05] text-left text-xs text-white/70">
                        <tr><th className="px-3 py-2">Source</th><th className="px-3 py-2">Configgo</th></tr>
                      </thead>
                      <tbody className="text-sm">
                        {[
                          ["full_name","Name"],
                          ["email","Email"],
                          ["phone","Phone"],
                          ["project","Project"],
                          ["interest","Unit Type"],
                          ["source","Source"],
                        ].map(([s,d],i)=>(
                          <tr key={s} className={i%2 ? "bg-white/[0.02]":""}>
                            <td className="px-3 py-2 text-white/90">{s}</td>
                            <td className="px-3 py-2">
                              <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs text-white/85">{d}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                    <span>Validation: <b className="text-white/85">Passed</b> • Duplicates: <b className="text-white/85">3 merged</b></span>
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#C6F24E] px-3 py-1.5 text-black">
                      Continue <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Panel>
              </div>
            </div>
            <p className="typo-small mt-4 text-white/60">Rollback-safe imports with snapshots.</p>
          </motion.div>
        </motion.div>

        {/* Timeline & support (compact) */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          <motion.div variants={ITEM} className="md:col-span-8 rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-3 flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#C6F24E]" /><h3 className="text-lg">Your first 30 days</h3></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Timeline badge="Week 0–1" title="Plan & prepare" items={["Kickoff & success plan","Field/pipeline design","Data audit & mapping"]} icon={<ClipboardList className="h-4 w-4 text-[#C6F24E]" />} />
              <Timeline badge="Week 2"   title="Migrate & connect" items={["Imports to sandbox → prod","Connect forms & channels","QA with managers"]} icon={<ServerCog className="h-4 w-4 text-[#C6F24E]" />} />
              <Timeline badge="Week 3–4" title="Train & launch" items={["Role-based training","Go-live monitoring","Weekly health review"]} icon={<UserCheck className="h-4 w-4 text-[#C6F24E]" />} />
            </div>
          </motion.div>

          <motion.div variants={ITEM} className="md:col-span-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-3 text-sm text-white/85">Support & SLA</div>
            <div className="space-y-3 text-sm text-white/80">
              <Row icon={<LifeBuoy className="h-4 w-4 text-[#C6F24E]" />} text="Dedicated PM + shared Slack during rollout" />
              <Row icon={<ShieldCheck className="h-4 w-4 text-[#C6F24E]" />} text="Automated QA, duplicate merge & rollback" />
              <Row icon={<Rocket className="h-4 w-4 text-[#C6F24E]" />} text="99.95% uptime, 24h response, go-live priority" />
              <Row icon={<CheckCircle2 className="h-4 w-4 text-[#C6F24E]" />} text="No downtime migration; sandbox first" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* Small helpers */
function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-1 flex items-center gap-2 text-white">
        <span className="inline-grid h-7 w-7 place-items-center rounded-md bg-white/10 ring-1 ring-white/15">{icon}</span>
        <span className="font-[500]">{title}</span>
      </div>
      <p className="typo-small text-white/70">{children}</p>
    </div>
  );
}
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
      <div className="mb-2 text-xs text-white/60">{title}</div>
      {children}
    </div>
  );
}
function Timeline({ badge, title, items, icon }:{
  badge: string; title: string; items: string[]; icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85">{badge}</span>
        <span className="inline-grid h-8 w-8 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">{icon}</span>
      </div>
      <h4 className="text-white font-[500]">{title}</h4>
      <ul className="mt-2 space-y-2 text-sm text-white/80">
        {items.map((t) => (<li key={t} className="flex gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" />{t}</li>))}
      </ul>
    </div>
  );
}
function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center gap-2">{icon}<span>{text}</span></div>;
}
