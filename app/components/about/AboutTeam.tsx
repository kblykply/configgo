// app/components/about/AboutTeam.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Users, Linkedin, Github, Globe, Mail } from "lucide-react";

/* header offset (20vh fixed header) */
const HEADER_OFFSET = "20vh";

/* animations (per-block; no external controls) */
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
const CARD = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

type Dept = "Engineering" | "Product" | "Design" | "Sales" | "Operations";
type Member = {
  id: string;
  name: string;
  role: string;
  dept: Dept;
  image?: string;
  location?: string;
  socials?: Partial<{
    linkedin: string;
    github: string;
    website: string;
    email: string;
  }>;
};

const DEPARTMENTS = ["All", "Engineering", "Product", "Design", "Sales", "Operations"] as const;

/* demo data (replace images/links) */
const TEAM: Member[] = [
  { id: "m1", name: "Ayşe Demir", role: "Head of Product", dept: "Product", image: "/team/ayse.jpg", location: "Istanbul", socials: { linkedin: "#", website: "#" } },
  { id: "m2", name: "Mert Yılmaz", role: "Founding Engineer", dept: "Engineering", image: "/team/mert.jpg", location: "Ankara", socials: { github: "#", linkedin: "#" } },
  { id: "m3", name: "Elif Kaya", role: "Design Lead", dept: "Design", image: "/team/elif.jpg", location: "Izmir", socials: { linkedin: "#", website: "#" } },
  { id: "m4", name: "Can Aydın", role: "Solutions Architect", dept: "Engineering", image: "/team/can.jpg", location: "Istanbul", socials: { linkedin: "#", email: "mailto:can@example.com" } },
  { id: "m5", name: "Selin Aras", role: "Growth & Partnerships", dept: "Sales", image: "/team/selin.jpg", location: "Ankara", socials: { linkedin: "#", website: "#" } },
  { id: "m6", name: "Kerem Aksoy", role: "Operations Manager", dept: "Operations", image: "/team/kerem.jpg", location: "Ankara", socials: { linkedin: "#", email: "mailto:ops@example.com" } },
  { id: "m7", name: "Derya Uçar", role: "Product Manager", dept: "Product", image: "/team/derya.jpg", location: "Remote (TR)", socials: { linkedin: "#" } },
  { id: "m8", name: "Baran Koç", role: "Frontend Engineer", dept: "Engineering", image: "/team/baran.jpg", location: "Bursa", socials: { github: "#", linkedin: "#" } },
];

export default function AboutTeam() {
  const [active, setActive] = useState<(typeof DEPARTMENTS)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return TEAM;
    return TEAM.filter((m) => m.dept === active);
  }, [active]);

  const counts = useMemo(() => {
    return {
      All: TEAM.length,
      Engineering: TEAM.filter((m) => m.dept === "Engineering").length,
      Product: TEAM.filter((m) => m.dept === "Product").length,
      Design: TEAM.filter((m) => m.dept === "Design").length,
      Sales: TEAM.filter((m) => m.dept === "Sales").length,
      Operations: TEAM.filter((m) => m.dept === "Operations").length,
    } as Record<(typeof DEPARTMENTS)[number], number>;
  }, []);

  return (
    <section id="team" className="relative" style={{ scrollMarginTop: HEADER_OFFSET }}>
      {/* distinct bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute -inset-x-16 top-1/3 h-48 rotate-[-2deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.10),rgba(255,255,255,0.02),rgba(198,242,78,0.10))] blur-xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-6 md:mb-10"
        >
          <motion.div variants={CARD} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Users className="h-3.5 w-3.5 text-[#C6F24E]" />
            Meet the team
          </motion.div>
          <motion.h2 variants={CARD} className="typo-h2-md mt-3">
            Builders behind the <span className="text-[#C6F24E]">platform</span>
          </motion.h2>
          <motion.p variants={CARD} className="typo-small mt-2 max-w-[760px] text-white/70">
            Product minds, engineers, designers and operators crafting CRM, Digital Twin and the workflows between.
          </motion.p>
        </motion.div>

        {/* filter chips */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {DEPARTMENTS.map((d) => {
            const isActive = active === d;
            return (
              <motion.button
                key={d}
                variants={CARD}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(d)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition",
                  isActive
                    ? "border-[#C6F24E]/40 bg-[#C6F24E]/20 text-white"
                    : "border-white/15 bg-white/10 text-white/80 hover:bg-white/15",
                ].join(" ")}
              >
                <span>{d}</span>
                <span
                  className={[
                    "rounded-md px-1.5 py-0.5 text-[11px] ring-1",
                    isActive ? "bg-[#C6F24E]/30 ring-[#C6F24E]/40" : "bg-white/10 ring-white/15",
                  ].join(" ")}
                >
                  {counts[d]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* grid (restaggers on filter change, and also replays on viewport enter) */}
        <motion.ul
          key={active} /* restagger when filter changes */
          variants={WRAP}
          initial="hidden"
          animate="show"             /* ensure visible during filter changes */
          whileInView="show"         /* replay on re-enter */
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((m) => (
            <motion.li key={m.id} variants={CARD} whileHover={{ y: -4, scale: 1.01 }}>
              <TeamCard member={m} />
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mt-10 flex justify-center"
        >
          <motion.div variants={CARD}>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              We’re hiring — see open roles
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------- card -------- */

function TeamCard({ member }: { member: Member }) {
  const { name, role, dept, image, location, socials } = member;
  const initials = getInitials(name);

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      {/* media */}
      <div className="relative h-[220px] overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,rgba(198,242,78,0.12),rgba(255,255,255,0.03))]">
            <div className="inline-grid h-16 w-16 place-items-center rounded-full bg-black/40 text-xl font-[600] text-white ring-2 ring-[#C6F24E]/40">
              {initials}
            </div>
          </div>
        )}

        {/* top chips */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-[#C6F24E]/80 px-2 py-0.5 text-[10px] font-medium text-black">{dept}</span>
          {location ? (
            <span className="rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] text-white/85">
              {location}
            </span>
          ) : null}
        </div>
      </div>

      {/* body */}
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-white font-[500]">{name}</div>
            <div className="text-[12px] text-white/65">{role}</div>
          </div>
          {/* socials */}
          <div className="flex items-center gap-2">
            {socials?.linkedin ? (
              <SocialLink href={socials.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            ) : null}
            {socials?.github ? (
              <SocialLink href={socials.github} label="GitHub">
                <Github className="h-4 w-4" />
              </SocialLink>
            ) : null}
            {socials?.website ? (
              <SocialLink href={socials.website} label="Website">
                <Globe className="h-4 w-4" />
              </SocialLink>
            ) : null}
            {socials?.email ? (
              <SocialLink href={socials.email} label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-white/10 text-white/85 transition hover:bg-white/15"
    >
      {children}
    </Link>
  );
}

/* utils */
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}
