// app/components/configgo/ConfiggoSecurity.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Lock,
  KeySquare,
  Fingerprint,
  Server,
  Globe,
  Database,
  RotateCcw,
  FileCheck,
  Bug,
  Activity,
  ScrollText,
  Download,
} from "lucide-react";

/* ---------- animations ---------- */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const PANEL = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

// reserve space for your fixed header
const HEADER_OFFSET = "clamp(72px, 16vh, 128px)";

export default function ConfiggoSecurity() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  const [region, setRegion] = useState<"EU" | "US" | "TR" | "MENA">("EU");

  return (
    <section
      ref={ref}
      id="security"
      className="relative"
      style={{ paddingTop: HEADER_OFFSET, scrollMarginTop: HEADER_OFFSET }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_140%_at_50%_0%,rgba(198,242,78,0.07),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 pb-16 md:pb-24">
        {/* header */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">Security & Compliance</motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Enterprise-grade protection, <span className="text-[#C6F24E]">by default</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-3 max-w-[880px] mx-auto text-white/70">
            Defense-in-depth across application, data, and network layers. Encryption everywhere,
            strict access controls, full auditability, and clear compliance posture.
          </motion.p>
        </motion.div>

        {/* top row: badges • nucleus • policy pack */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* badges */}
          <motion.div variants={PANEL} className="md:col-span-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
              <ShieldCheck className="h-4 w-4 text-[#C6F24E]" /> Compliance alignment
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Badge label="GDPR" desc="DPA & SCCs available" />
              <Badge label="CCPA" desc="Request/erase workflows" />
              <Badge label="ISO 27001" desc="Control-aligned" />
              <Badge label="SOC 2" desc="Type II–ready controls" />
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <Row icon={<ScrollText className="h-4 w-4 text-[#C6F24E]" />} text="Security pack: DPA, Subprocessors, Policies" />
              <Row icon={<FileCheck className="h-4 w-4 text-[#C6F24E]" />} text="Annual pen-tests, remediation tracking" />
            </ul>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85 hover:bg-white/15">
              <Download className="h-3.5 w-3.5" /> Request security pack
            </button>
          </motion.div>

          {/* nucleus lock */}
          <motion.div variants={PANEL} className="md:col-span-4">
            <div className="relative grid place-items-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <motion.div
                className="absolute h-[380px] w-[380px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(198,242,78,0.25), rgba(198,242,78,0.0) 40%, rgba(198,242,78,0.25))",
                  filter: "blur(22px)",
                }}
                initial={{ rotate: 0, opacity: 0.6 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              />
              <div className="relative z-[1] grid place-items-center rounded-full bg-white/[0.06] p-10 ring-1 ring-white/10">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <Lock className="h-10 w-10 text-[#C6F24E]" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-white/70">
                  <Mini label="AES-256 at rest" icon={<Database className="h-3.5 w-3.5 text-[#C6F24E]" />} />
                  <Mini label="TLS 1.2+ in transit" icon={<Activity className="h-3.5 w-3.5 text-[#C6F24E]" />} />
                  <Mini label="KMS-managed keys" icon={<KeySquare className="h-3.5 w-3.5 text-[#C6F24E]" />} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* policy pack */}
          <motion.div variants={PANEL} className="md:col-span-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
              <ScrollText className="h-4 w-4 text-[#C6F24E]" /> Trust & access controls
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              <Row icon={<Fingerprint className="h-4 w-4 text-[#C6F24E]" />} text="SSO (SAML / OIDC) & SCIM provisioning" />
              <Row icon={<ShieldCheck className="h-4 w-4 text-[#C6F24E]" />} text="RBAC with field-level permissions" />
              <Row icon={<Server className="h-4 w-4 text-[#C6F24E]" />} text="Immutable audit logs & export" />
              <Row icon={<RotateCcw className="h-4 w-4 text-[#C6F24E]" />} text="Daily backups & point-in-time restore" />
              <Row icon={<Bug className="h-4 w-4 text-[#C6F24E]" />} text="Monitoring, alerting & vulnerability scanning" />
            </ul>
          </motion.div>
        </motion.div>

        {/* bottom row: region + encryption + data mgmt */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* residency */}
          <motion.div variants={PANEL} className="md:col-span-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/85">
                <Globe className="h-4 w-4 text-[#C6F24E]" /> Data residency
              </div>
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 p-1 text-xs">
                {(["EU", "US", "TR", "MENA"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={[
                      "rounded-full px-3 py-1.5 transition",
                      region === r ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-white/80">
              {region === "EU" && (
                <p><b className="text-white/90">Primary:</b> eu-central • <b className="text-white/90">Failover:</b> eu-west.  
                SCCs supported for international transfers.</p>
              )}
              {region === "US" && (
                <p><b className="text-white/90">Primary:</b> us-east • <b className="text-white/90">Failover:</b> us-west.  
                Data remains within the US regions.</p>
              )}
              {region === "TR" && (
                <p><b className="text-white/90">Primary:</b> Türkiye (ankara/istanbul zones).  
                Residency for projects with local requirements.</p>
              )}
              {region === "MENA" && (
                <p><b className="text-white/90">Primary:</b> me-central • <b className="text-white/90">Failover:</b> me-west.  
                Low-latency access across GCC countries.</p>
              )}
            </div>
          </motion.div>

          {/* encryption details */}
          <motion.div variants={PANEL} className="md:col-span-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
              <KeySquare className="h-4 w-4 text-[#C6F24E]" /> Encryption
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" /> AES-256 at rest with managed KMS</li>
              <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" /> TLS 1.2+ in transit (HSTS, PFS)</li>
              <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" /> Secrets stored in vault, rotated regularly</li>
            </ul>
          </motion.div>

          {/* data management */}
          <motion.div variants={PANEL} className="md:col-span-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
              <Database className="h-4 w-4 text-[#C6F24E]" /> Data control & lifecycle
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" /> Export & erasure requests (GDPR/CCPA)</li>
              <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" /> Configurable retention policies per object</li>
              <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" /> Immutable audit events & admin reports</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- tiny UI helpers ---------- */
function Badge({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <div className="text-sm font-[500] text-white">{label}</div>
      <div className="mt-0.5 text-[11px] text-white/60">{desc}</div>
    </div>
  );
}
function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center gap-2">{icon}<span>{text}</span></div>;
}
function Mini({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1">
      <span className="text-white/85">{icon}</span>
      <span className="text-[11px] text-white/80">{label}</span>
    </div>
  );
}
