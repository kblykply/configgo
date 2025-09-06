// app/components/about/AboutSecurity.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck,
  Database,
  Globe2,
  Server,
  Eye,
  Activity,
  UserCheck,
  FileKey,
  BadgeCheck,
} from "lucide-react";

const HEADER_OFFSET = "20vh";
const EASE = [0.22, 0.61, 0.36, 1] as const;

const WRAP = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, staggerChildren: 0.06 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.5, ease: EASE } },
};

export default function AboutSecurity() {
  return (
    <section
      id="security"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct bg: angled lime band + soft halo + micro grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute -inset-x-10 top-16 h-44 rotate-[2deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.12),rgba(255,255,255,0.02),rgba(198,242,78,0.12))] blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-8 md:mb-12"
        >
          <motion.p variants={ITEM} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <ShieldCheck className="h-3.5 w-3.5 text-[#C6F24E]" />
            Security & trust
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Snapshot of how we <span className="text-[#C6F24E]">protect</span> your data
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            Controls, residency and compliance at-a-glance. Detailed docs available on request.
          </motion.p>
        </motion.div>

        {/* Layout: Summary (left) + Tiles (right) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* Summary panel */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
            className="md:col-span-5"
          >
            <motion.div variants={ITEM} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              {/* subtle ring */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-white text-lg font-[500]">Defense in depth</div>
                  <div className="text-[12px] text-white/65">Security is a product requirement—not an add-on.</div>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-white/85">
                <Li icon={<Lock className="h-4 w-4" />}>Encryption in transit (TLS 1.2+) & at rest (AES-256)</Li>
                <Li icon={<KeyRound className="h-4 w-4" />}>SSO (SAML/OIDC) & granular RBAC, SCIM on Enterprise</Li>
                <Li icon={<FileCheck className="h-4 w-4" />}>Audit logs & immutable event trails</Li>
                <Li icon={<Database className="h-4 w-4" />}>Automated backups with rolling retention</Li>
                <Li icon={<Eye className="h-4 w-4" />}>Privacy by design & least-privilege access</Li>
              </ul>

              {/* quick stats */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <QuickStat k="99.9%" label="Uptime target" />
                <QuickStat k="30d" label="Backup retention" />
                <QuickStat k="24h/1h" label="RPO/RTO" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/security"
                  className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-4 py-2 text-sm text-black hover:opacity-95"
                >
                  Security overview
                </Link>
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
                >
                  Status page
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right tiles */}
          <div className="md:col-span-7 grid grid-cols-1 gap-6">
            {/* Compliance badges */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            >
              <motion.div variants={ITEM} className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/85">
                  <BadgeCheck className="h-4 w-4 text-[#C6F24E]" />
                  Compliance (snapshot)
                </div>
                <Link href="/legal" className="text-[12px] text-white/70 hover:text-white">Legal & policies →</Link>
              </motion.div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Badge label="GDPR" status="Compliant" />
                <Badge label="SOC 2" status="In progress" muted />
                <Badge label="ISO 27001" status="On roadmap" muted />
                <Badge label="DPA" status="Available" />
                <Badge label="Subprocessors" status="Listed" />
                <Badge label="Pen Test" status="Annual" />
              </div>
            </motion.div>

            {/* Data residency */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            >
              <motion.div variants={ITEM} className="mb-3 flex items-center gap-2 text-sm text-white/85">
                <Globe2 className="h-4 w-4 text-[#C6F24E]" />
                Data residency options
              </motion.div>
              <div className="flex flex-wrap gap-2">
                <Chip>EU — Frankfurt</Chip>
                <Chip>US — N. Virginia</Chip>
                <Chip>TR — Istanbul</Chip>
                <Chip>MENA — Bahrain</Chip>
              </div>
              <p className="mt-3 text-[12px] text-white/60">
                Residency and failover options vary by plan. Contact sales for architecture details.
              </p>
            </motion.div>

            {/* Controls grid */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            >
              <motion.div variants={ITEM} className="mb-3 flex items-center gap-2 text-sm text-white/85">
                <Server className="h-4 w-4 text-[#C6F24E]" />
                Platform controls
              </motion.div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Control icon={<Lock className="h-4 w-4" />} title="Encryption">
                  TLS 1.2+ in transit, AES-256 at rest
                </Control>
                <Control icon={<KeyRound className="h-4 w-4" />} title="Identity">
                  SSO (SAML/OIDC), SCIM user provisioning
                </Control>
                <Control icon={<UserCheck className="h-4 w-4" />} title="Access">
                  RBAC, least-privilege, IP allowlists (Enterprise)
                </Control>
                <Control icon={<Activity className="h-4 w-4" />} title="Auditability">
                  Event trails, exportable logs
                </Control>
                <Control icon={<FileKey className="h-4 w-4" />} title="Data lifecycle">
                  Backups, retention & deletion workflows
                </Control>
                <Control icon={<Eye className="h-4 w-4" />} title="Privacy">
                  DPA, subprocessors list, DSAR support
                </Control>
              </div>
            </motion.div>

            {/* Docs & downloads */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            >
              <motion.div variants={ITEM} className="mb-3 flex items-center gap-2 text-sm text-white/85">
                <FileCheck className="h-4 w-4 text-[#C6F24E]" />
                Documentation
              </motion.div>
              <div className="flex flex-wrap gap-2">
                <DocLink href="/security/dpa">Data Processing Addendum</DocLink>
                <DocLink href="/legal/subprocessors">Subprocessors</DocLink>
                <DocLink href="/security/pen-test-summary">Pen test summary</DocLink>
                <DocLink href="/security/whitepaper">Security whitepaper</DocLink>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function Li({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 inline-grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

function QuickStat({ k, label }: { k: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-center">
      <div className="text-xl font-[600] text-white">{k}</div>
      <div className="text-[11px] text-white/60">{label}</div>
    </div>
  );
}

function Badge({ label, status, muted = false }: { label: string; status: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2">
      <span className="text-sm text-white">{label}</span>
      <span
        className={[
          "rounded-full px-2 py-0.5 text-[10px]",
          muted ? "border border-white/15 bg-black/40 text-white/70" : "border border-[#C6F24E]/40 bg-[#C6F24E]/20 text-white",
        ].join(" ")}
      >
        {status}
      </span>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[12px] text-white/85">
      {children}
    </span>
  );
}

function Control({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3">
      <span className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
        {icon}
      </span>
      <div>
        <div className="text-sm text-white">{title}</div>
        <div className="text-[12px] text-white/70">{children}</div>
      </div>
    </div>
  );
}

function DocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] text-white/85 hover:bg-white/15"
    >
      {children}
    </Link>
  );
}
