// app/components/configgo/ConfiggoPricing.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import { Check, X, ArrowRight, ShieldCheck, Sparkles, Crown, Star } from "lucide-react";

/* ---------- animations (no SSR-hidden state) ---------- */
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ---------- exact header offset = 20vh ---------- */
const HEADER_OFFSET = "20vh";

/* ---------- pricing data ---------- */
type Currency = "try" | "usd";
type PlanKey = "starter" | "pro" | "enterprise";
const DISPLAY_CURRENCY: Record<Currency, string> = { try: "₺", usd: "$" };
const PRICES: Record<Currency, Record<Exclude<PlanKey, "enterprise">, number>> = {
  try: { starter: 1499, pro: 3999 },
  usd: { starter: 79, pro: 199 },
};
const YEARLY_DISCOUNT = 0.2;

/* ---------- comparison data ---------- */
type CellVal = boolean | string;
type Row = { label: string; starter: CellVal; pro: CellVal; enterprise: CellVal; hint?: string };
type Group = { title: string; rows: Row[] };

const GROUPS: Group[] = [
  {
    title: "Core CRM",
    rows: [
      { label: "Contacts & companies", starter: "50k", pro: "Unlimited", enterprise: "Unlimited" },
      { label: "Pipelines", starter: "1", pro: "3", enterprise: "Unlimited" },
      { label: "Custom fields", starter: "30", pro: "200", enterprise: "Unlimited" },
      { label: "Tasks & reminders", starter: true, pro: true, enterprise: true },
    ],
  },
  {
    title: "Lead capture & routing",
    rows: [
      { label: "Web forms & UTM capture", starter: true, pro: true, enterprise: true },
      { label: "Round-robin routing", starter: "Basic", pro: "Advanced", enterprise: "Advanced+" },
      { label: "Auto-assignment by office/project", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    title: "Sales & inventory (real estate)",
    rows: [
      { label: "Unit inventory & availability", starter: true, pro: true, enterprise: true },
      { label: "Price books & discounts", starter: false, pro: true, enterprise: true },
      { label: "Booking & reservation holds", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    title: "Omnichannel",
    rows: [
      { label: "Email & SMS", starter: true, pro: true, enterprise: true },
      { label: "WhatsApp (via provider)", starter: false, pro: true, enterprise: true },
      { label: "Unified inbox & SLA timers", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    title: "Automation & analytics",
    rows: [
      { label: "Workflow automation", starter: false, pro: true, enterprise: true },
      { label: "Campaigns & drip journeys", starter: false, pro: true, enterprise: true },
      { label: "Dashboards & cohort reports", starter: "Standard", pro: "Advanced", enterprise: "Advanced+" },
    ],
  },
  {
    title: "Security & admin",
    rows: [
      { label: "RBAC & audit logs", starter: true, pro: true, enterprise: true },
      { label: "SSO (SAML/OIDC)", starter: false, pro: false, enterprise: true },
      { label: "Data residency", starter: "Shared EU/US", pro: "EU/US choice", enterprise: "EU/US/TR/MENA" },
    ],
  },
  {
    title: "Add-ons",
    rows: [
      { label: "Digital Twin integration", starter: "Add-on", pro: "Add-on", enterprise: "Included", hint: "Embed 3D & sync availability" },
      { label: "Premium support / SLA", starter: "—", pro: "Business", enterprise: "Enterprise" },
    ],
  },
];

export default function ConfiggoPricing() {
  const [currency, setCurrency] = useState<Currency>("try");
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");

  const price = useMemo(() => {
    const base = PRICES[currency];
    const factor = cycle === "yearly" ? 1 - YEARLY_DISCOUNT : 1;
    return {
      starter: Math.round(base.starter * factor),
      pro: Math.round(base.pro * factor),
    };
  }, [currency, cycle]);

  const sym = DISPLAY_CURRENCY[currency];
  const format = (n: number) => n.toLocaleString(currency === "try" ? "tr-TR" : "en-US");

  return (
    <section
      id="pricing"
      className="relative"
      style={{ paddingTop: HEADER_OFFSET, scrollMarginTop: HEADER_OFFSET }}
    >
      {/* visible glow so you always see the section */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.06),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          className="mb-8 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">Pricing & Plans</motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Choose the plan that <span className="text-[#C6F24E]">fits</span> your team
          </motion.h2>

          {/* Toggles */}
          <motion.div variants={ITEM} className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 p-1 text-xs">
              <button
                onClick={() => setCycle("monthly")}
                className={["rounded-full px-3 py-1.5 transition", cycle === "monthly" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10"].join(" ")}
                aria-pressed={cycle === "monthly"}
              >
                Monthly
              </button>
              <button
                onClick={() => setCycle("yearly")}
                className={["rounded-full px-3 py-1.5 transition", cycle === "yearly" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10"].join(" ")}
                aria-pressed={cycle === "yearly"}
              >
                Yearly <span className="ml-1 opacity-80">-20%</span>
              </button>
            </div>

            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 p-1 text-xs">
              <button
                onClick={() => setCurrency("try")}
                className={["rounded-full px-3 py-1.5 transition", currency === "try" ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10"].join(" ")}
              >
                ₺ TRY
              </button>
              <button
                onClick={() => setCurrency("usd")}
                className={["rounded-full px-3 py-1.5 transition", currency === "usd" ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10"].join(" ")}
              >
                $ USD
              </button>
            </div>
          </motion.div>

          <motion.p variants={ITEM} className="typo-small mt-3 text-white/60">
            Prices are per user / month {cycle === "yearly" ? " (billed annually)" : ""}. Taxes extra.
          </motion.p>
        </motion.div>

        {/* Plan cards */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-12"
        >
          <motion.div variants={ITEM} className="md:col-span-4">
            <PlanCard
              title="Starter"
              icon={<Star className="h-5 w-5 text-[#C6F24E]" />}
              price={`${sym}${format(price.starter)}`}
              suffix="/mo"
              subtitle="For small teams getting started"
              bullets={["50k contacts", "1 pipeline & basic reports", "Email/SMS channels"]}
              cta={{ label: "Start free trial", href: "/signup" }}
            />
          </motion.div>

          <motion.div variants={ITEM} className="md:col-span-4">
            <PlanCard
              highlight
              title="Pro"
              icon={<Crown className="h-5 w-5 text-black" />}
              price={`${sym}${format(price.pro)}`}
              suffix="/mo"
              subtitle="Best for growing sales teams"
              bullets={["Unlimited contacts", "3 pipelines & advanced reports", "WhatsApp + routing rules", "Automation workflows"]}
              badge={cycle === "yearly" ? "Save 20% yearly" : "Most popular"}
              cta={{ label: "Upgrade to Pro", href: "/checkout?plan=pro" }}
            />
          </motion.div>

          <motion.div variants={ITEM} className="md:col-span-4">
            <PlanCard
              title="Enterprise"
              icon={<ShieldCheck className="h-5 w-5 text-[#C6F24E]" />}
              price="Custom"
              subtitle="For large teams & compliance needs"
              bullets={["Unlimited everything", "SSO, SCIM & data residency", "Digital Twin included", "Premium support / SLA"]}
              cta={{ label: "Contact sales", href: "/contact" }}
            />
          </motion.div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          className="mt-10"
        >
          <motion.div variants={ITEM} className="mb-3 flex items-center gap-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-[#C6F24E]" />
            Detailed plan comparison
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="max-h-[520px] overflow-auto">
              <table className="w-full table-fixed min-w-[860px]">
                <colgroup>
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>

                <thead className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-white/10">
                  <tr className="text-left text-xs text-white/70">
                    <th className="px-3 py-3 font-normal">Feature</th>
                    <th className="px-2 py-3 font-normal text-center">Starter</th>
                    <th className="px-2 py-3 font-normal text-center">Pro</th>
                    <th className="px-2 py-3 font-normal text-center">Enterprise</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {GROUPS.map((g, gi) => (
                    <FragmentGroup key={g.title} title={g.title} first={gi === 0}>
                      {g.rows.map((r, i) => (
                        <tr key={r.label} className={i % 2 ? "bg-white/[0.02]" : ""}>
                          <td className="px-3 py-2 align-middle">
                            <div className="flex items-center gap-2">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" />
                              <span className="text-white">{r.label}</span>
                              {r.hint ? <span className="text-[11px] text-white/50">— {r.hint}</span> : null}
                            </div>
                          </td>
                          <PlanCell v={r.starter} />
                          <PlanCell v={r.pro} highlighted />
                          <PlanCell v={r.enterprise} />
                        </tr>
                      ))}
                    </FragmentGroup>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-white/10 px-3 py-2 text-[11px] text-white/60">
              All plans include encryption in transit & at rest, role-based access, audit logs, and API access.
            </div>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-4 py-2 text-sm text-black hover:opacity-95"
          >
            Start free trial <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
          >
            Talk to sales
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */
type CellVal = boolean | string;

function PlanCell({ v, highlighted = false }: { v: CellVal; highlighted?: boolean }) {
  const cls = ["px-2 py-2 text-center align-middle"];
  if (highlighted) cls.push("bg-white/[0.03]");
  if (typeof v === "boolean") {
    return (
      <td className={cls.join(" ")}>
        <span
          className={[
            "inline-grid h-7 w-7 place-items-center rounded-md ring-1",
            v ? "bg-[#C6F24E]/15 text-[#C6F24E] ring-[#C6F24E]/30" : "bg-white/5 text-white/55 ring-white/15",
          ].join(" ")}
          aria-label={v ? "Included" : "Not included"}
          title={v ? "Included" : "Not included"}
        >
          {v ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
        </span>
      </td>
    );
  }
  return (
    <td className={cls.join(" ")}>
      <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs text-white/85">{v}</span>
    </td>
  );
}

function PlanCard({
  title,
  subtitle,
  icon,
  price,
  suffix,
  bullets,
  cta,
  highlight,
  badge,
}: {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  price: string;
  suffix?: string;
  bullets: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
        highlight
          ? "border-[#C6F24E]/50 bg-[linear-gradient(180deg,rgba(198,242,78,0.12),rgba(255,255,255,0.04))]"
          : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      {badge ? (
        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
          {badge}
        </div>
      ) : null}

      <div className="mb-3 flex items-center gap-2">
        <div
          className={[
            "inline-grid h-10 w-10 place-items-center rounded-lg ring-1",
            highlight ? "bg-[#C6F24E] ring-[#C6F24E]/40" : "bg-white/10 ring-white/15",
          ].join(" ")}
        >
          {icon}
        </div>
        <div>
          <div className="text-white text-lg font-[500]">{title}</div>
          {subtitle ? <div className="text-xs text-white/60">{subtitle}</div> : null}
        </div>
      </div>

      <div className="mb-3">
        <div className="text-3xl font-[600] text-white">
          {price}
          {suffix ? <span className="ml-1 text-base font-normal text-white/70">{suffix}</span> : null}
        </div>
        <div className="mt-1 text-[11px] text-white/60">Per user / month</div>
      </div>

      <ul className="mb-4 space-y-2 text-sm text-white/85">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-[#C6F24E]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link
        href={cta.href}
        className={[
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
          highlight ? "border-transparent bg-black/80 text-white hover:bg-black/70" : "border-white/15 bg-white/10 text-white/85 hover:bg-white/15",
        ].join(" ")}
      >
        {cta.label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function FragmentGroup({ title, first, children }: { title: string; first?: boolean; children: ReactNode }) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className={[
            "px-3 py-2 text-xs uppercase tracking-wide text-white/60",
            first ? "" : "border-t border-white/10",
          ].join(" ")}
        >
          {title}
        </td>
      </tr>
      {children}
    </>
  );
}
