// app/components/configgo/ConfiggoTeams.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  Users2,
  ShieldCheck,
  KeyRound,
  Globe2,
  Lock,
  Settings2,
  Megaphone,
  Upload,
  Tag,
  Check,
  X,
} from "lucide-react";

/* -------------------- Types -------------------- */
type Role = "Admin" | "Sales Manager" | "Agent" | "Marketing" | "Broker";
type PermKey =
  | "view_leads"
  | "edit_deals"
  | "bulk_export"
  | "pricing"
  | "manage_inventory"
  | "automation"
  | "manage_offices";

/* -------------------- Data -------------------- */
const ROLES: Role[] = ["Admin", "Sales Manager", "Agent", "Marketing", "Broker"];

const PERMS: { key: PermKey; label: string; icon: React.ReactNode }[] = [
  { key: "view_leads",       label: "View leads & contacts",    icon: <Users2 className="h-3.5 w-3.5" /> },
  { key: "edit_deals",       label: "Create & edit deals",      icon: <Settings2 className="h-3.5 w-3.5" /> },
  { key: "bulk_export",      label: "Export data",              icon: <Upload className="h-3.5 w-3.5" /> },
  { key: "pricing",          label: "See pricing & discounts",  icon: <Tag className="h-3.5 w-3.5" /> },
  { key: "manage_inventory", label: "Manage inventory",         icon: <Building2 className="h-3.5 w-3.5" /> },
  { key: "automation",       label: "Automation & campaigns",   icon: <Megaphone className="h-3.5 w-3.5" /> },
  { key: "manage_offices",   label: "Manage offices & roles",   icon: <KeyRound className="h-3.5 w-3.5" /> },
];

// Baseline permissions by role (product-wide; no city-specific changes)
const BASE: Record<Role, Set<PermKey>> = {
  Admin: new Set<PermKey>(PERMS.map((p) => p.key)),
  "Sales Manager": new Set<PermKey>([
    "view_leads", "edit_deals", "bulk_export", "pricing", "manage_inventory", "automation",
  ]),
  Agent: new Set<PermKey>(["view_leads", "edit_deals", "pricing"]),
  Marketing: new Set<PermKey>(["view_leads", "automation", "bulk_export"]),
  Broker: new Set<PermKey>(["view_leads", "edit_deals"]),
};

/* -------------------- Animation -------------------- */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* -------------------- Component -------------------- */
export default function ConfiggoTeams() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  const [highlight, setHighlight] = useState<Role | null>("Sales Manager");

  function hasPerm(r: Role, p: PermKey): boolean {
    return BASE[r].has(p);
  }

  return (
    <section ref={ref} className="relative" id="teams">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_65%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header band (no city switcher) */}
        <div className="mb-8 rounded-xl border border-white/10 bg-[linear-gradient(115deg,rgba(198,242,78,0.06),rgba(255,255,255,0.02))] p-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#C6F24E]/15 ring-1 ring-[#C6F24E]/25">
                <ShieldCheck className="h-5 w-5 text-[#C6F24E]" />
              </div>
              <div>
                <div className="typo-small-heading text-white/70">Teams & permissions</div>
                <h2 className="text-xl font-[500] text-white md:text-2xl">The right access — product-wide</h2>
              </div>
            </div>
            {/* (Intentionally no city/office switcher) */}
          </div>
        </div>

        {/* Body */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* LEFT rail */}
          <motion.aside variants={ITEM} className="md:col-span-4 space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-2 text-sm text-white/80">Why role-based access?</div>
              <p className="typo-small text-white/70">
                Keep data secure and workflows focused. Assign clear roles and enable only the capabilities each team needs.
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { Icon: Globe2, txt: "Consistent rules across the whole product" },
                  { Icon: Lock,   txt: "Principle of least privilege by default" },
                  { Icon: Users2, txt: "Invite partners with scoped access" },
                ].map(({ Icon, txt }) => (
                  <li key={txt} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                      <Icon className="h-4 w-4 text-[#C6F24E]" />
                    </span>
                    {txt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.03] p-5">
              <div className="mb-2 text-sm text-white/80">Scope presets</div>
              <div className="flex flex-wrap gap-2">
                {["Global", "Project", "Team"].map((s) => (
                  <span key={s} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85">
                    {s}
                  </span>
                ))}
              </div>
              <p className="typo-small mt-3 text-white/60">
                Start global, then narrow permissions by project or team where needed.
              </p>
            </div>
          </motion.aside>

          {/* RIGHT — permission matrix (full width; no audit rail) */}
          <motion.div variants={ITEM} className="md:col-span-8">
            <div className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <ShieldCheck className="h-4 w-4 text-[#C6F24E]" />
                  Admin console — Permissions
                </div>
                <div className="text-xs text-white/60">Changes are saved automatically</div>
              </div>

              <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                <div className="border-b border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Permission matrix
                </div>

                <div className="max-h-[420px] overflow-auto">
                  <table className="w-full table-fixed min-w-[840px]">
                    <colgroup>
                      <col style={{ width: "36%" }} />
                      {ROLES.map((_, i) => (
                        <col key={i} style={{ width: `${64 / ROLES.length}%` }} />
                      ))}
                    </colgroup>

                    <thead className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-white/10">
                      <tr className="text-left text-xs text-white/70">
                        <th className="px-3 py-2 font-normal">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-[#C6F24E]" />
                            Permission
                          </div>
                        </th>
                        {ROLES.map((r) => (
                          <th
                            key={r}
                            className={[
                              "px-2 py-2 font-normal text-center cursor-pointer rounded-sm",
                              highlight === r ? "bg-white/[0.05] text-white" : "",
                            ].join(" ")}
                            onClick={() => setHighlight(r)}
                            onMouseEnter={() => setHighlight(r)}
                            onMouseLeave={() => setHighlight((h) => (h === r ? null : h))}
                            title={`Highlight ${r}`}
                          >
                            {r}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="text-sm">
                      {PERMS.map((perm, ri) => (
                        <tr key={perm.key} className={ri % 2 ? "bg-white/[0.02]" : ""}>
                          {/* label cell */}
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2 text-white">
                              <span className="grid h-7 w-7 place-items-center rounded-md bg-white/5 ring-1 ring-white/10 text-[#C6F24E]">
                                {perm.icon}
                              </span>
                              <span className="truncate">{perm.label}</span>
                            </div>
                          </td>

                          {/* role cells */}
                          {ROLES.map((role, ci) => {
                            const allowed = hasPerm(role, perm.key);
                            const activeCol = highlight === role;
                            return (
                              <td
                                key={role}
                                className={[
                                  "px-2 py-2 text-center align-middle",
                                  activeCol ? "bg-white/[0.04]" : "",
                                ].join(" ")}
                              >
                                <motion.span
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.35, ease: EASE, delay: 0.015 * (ri + ci) },
                                  }}
                                  className={[
                                    "inline-grid h-7 w-7 place-items-center rounded-md ring-1",
                                    allowed
                                      ? "bg-[#C6F24E]/15 text-[#C6F24E] ring-[#C6F24E]/30"
                                      : "bg-white/5 text-white/55 ring-white/15",
                                  ].join(" ")}
                                  aria-label={allowed ? "Allowed" : "Denied"}
                                  title={allowed ? "Allowed" : "Denied"}
                                >
                                  {allowed ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                                </motion.span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-white/10 px-3 py-2 text-[11px] text-white/60">
                  Tip: click a role header to highlight its column.
                </div>
              </div>
            </div>

            <p className="typo-small mt-3 text-white/60">
              Roles are applied consistently across the product. Adjust by team or project when you need finer control.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
