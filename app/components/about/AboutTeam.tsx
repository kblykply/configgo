// app/components/about/AboutTeam.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Users, Linkedin, Github, Globe, Mail } from "lucide-react";

/**
 * Put images under /public/team using these filenames (or update below paths):
 * deniz.png, ulas.png, kaan.png, ezgi.png, buse.png, fatih.png, furkan.png, mehmet.png,
 * tanay.png, munevver.png, yasin.png, batuhan.png, ege.png, melike.png, beyza.png, mert.png,
 * nazim.png, yunus.png, yagiz.jpg, bora.png
 */

const HEADER_OFFSET = "clamp(64px, 14vh, 20vh)";

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

type Dept =
  | "Leadership"
  | "Architecture"
  | "Game Engine"
  | "CRM & Web"
  | "Design"
  | "Customer Relations"
  | "Rendering";

type Member = {
  id: string;
  name: string;
  role: string;
  dept: Dept;
  image?: string;
  location?: string;
  badges?: string[];
  socials?: Partial<{
    linkedin: string;
    github: string;
    website: string;
    email: string;
  }>;
};

const DEPARTMENTS = [
  "All",
  "Leadership",
  "Architecture",
  "Game Engine",
  "CRM & Web",
  "Design",
  "Customer Relations",
  "Rendering",
] as const;

const img = (file: string) => `/team/${file}`;

const TEAM: Member[] = [
  // Leadership
  {
    id: "deniz-oktay-tuncay",
    name: "Deniz Oktay Tuncay",
    role: "Founder",
    dept: "Leadership",
    image: img("deniz.png"),
    socials: { linkedin: "https://www.linkedin.com/in/denizoktaytuncay/" },
  },
  {
    id: "ulas-turgut",
    name: "Ulaş Turğut",
    role: "Lead",
    dept: "Leadership",
    image: img("ulas.png"),
    socials: { linkedin: "https://www.linkedin.com/in/ula%C5%9F-tur%C4%9Fut-9a35a2239/" },
  },
  {
    id: "salih-kaan-koc",
    name: "Salih Kaan Koç",
    role: "Software Team Lead",
    dept: "Leadership",
    image: img("kaan.png"),
    socials: { linkedin: "https://www.linkedin.com/in/salih-kaan-ko%C3%A7/" },
  },

  // Architecture
  {
    id: "ezgi-akyol",
    name: "Ezgi Akyol",
    role: "Architect",
    dept: "Architecture",
    image: img("ezgi.png"),
    socials: { linkedin: "https://www.linkedin.com/in/ezgi-akyol-a2026a158/" },
  },
  {
    id: "buse-ozsari",
    name: "Buse Özsarı",
    role: "Architect",
    dept: "Architecture",
    image: img("buse.png"),
    socials: { linkedin: "https://www.linkedin.com/in/buse-ozsari/" },
  },

  // Game Engine
  {
    id: "fatih-gurbuz",
    name: "Fatih Gürbüz",
    role: "Game Engine Developer",
    dept: "Game Engine",
    image: img("fatih.png"),
    socials: { linkedin: "https://www.linkedin.com/in/fatih-g%C3%BCrb%C3%BCz-01b438229/" },
  },
  {
    id: "furkan-uysal",
    name: "Furkan Uysal",
    role: "Game Engine Developer",
    dept: "Game Engine",
    image: img("furkan.png"),
    socials: { linkedin: "https://www.linkedin.com/in/furkan-uysal-41490321a/" },
  },
  {
    id: "mehmet-emin-guzel",
    name: "Mehmet Emin Güzel",
    role: "Interior Design & Lighting Developer",
    dept: "Game Engine",
    image: img("mehmet.png"),
    socials: { linkedin: "https://www.linkedin.com/in/mehmet-emin-g%C3%BCzel-69474b225/" },
  },
  {
    id: "tanay-ozdemir",
    name: "Tanay Özdemir",
    role: "Environment Modeling & Optimization Specialist",
    dept: "Game Engine",
    image: img("tanay.png"),
    socials: { linkedin: "https://www.linkedin.com/in/bartutanay/" },
  },

  // CRM & Web
  {
    id: "munevver-verim",
    name: "Münevver Verim",
    role: "CRM Coordinator",
    dept: "CRM & Web",
    image: img("munevver.png"),
    socials: { linkedin: "https://www.linkedin.com/in/m%C3%BCnevver-verim-b43aa422a/" },
  },
  {
    id: "yasin-sefa-aksoy",
    name: "Yasin Sefa Aksoy",
    role: "CRM Coordinator",
    dept: "CRM & Web",
    image: img("yasin.png"),
    socials: { linkedin: "https://www.linkedin.com/in/yasin-sefa-aksoy-5b2438193/" },
  },
  {
    id: "batuhan-muzafferoglu",
    name: "Batuhan Muzafferoğlu",
    role: "CRM Coordinator",
    dept: "CRM & Web",
    image: img("batuhan.png"),
    socials: { linkedin: "https://www.linkedin.com/in/batuhan-muzafferoglu/" },
  },
  {
    id: "ege-moroglu",
    name: "Ege Moroğlu",
    role: "CRM Coordinator",
    dept: "CRM & Web",
    badges: ["Probation"],
    image: img("ege.png"),
    socials: { linkedin: "https://www.linkedin.com/in/ege-moroglu-37a30b190/" },
  },

  // Design
  {
    id: "melike-doga-kacaner",
    name: "Melike Doğa Kaçaner",
    role: "Graphic Design Specialist",
    dept: "Design",
    image: img("melike.png"),
    socials: { linkedin: "https://www.linkedin.com/in/melike-do%C4%9Fa-ka%C3%A7aner-7a5a2a372/" },
  },
  {
    id: "beyza-sezer",
    name: "Beyza Sezer",
    role: "UI-UX Designer",
    dept: "Design",
    image: img("beyza.png"),
    socials: { linkedin: "https://www.linkedin.com/in/beyzasezeer/" },
  },
  {
    id: "mert-cayli",
    name: "Mert Çaylı",
    role: "UI-UX Designer",
    dept: "Design",
    image: img("mert.png"),
    socials: { linkedin: "https://www.linkedin.com/in/mithatmertcayli/" },
  },

  // Customer Relations
  {
    id: "mehmet-nazim-gunay",
    name: "Mehmet Nazım Günay",
    role: "Customer Relations & Workflow Coordinator",
    dept: "Customer Relations",
    image: img("nazim.png"),
    socials: { linkedin: "https://www.linkedin.com/in/naz%C4%B1m-g%C3%BCnay-3a68a319b/" },
  },

  // Rendering
  {
    id: "yunus-yilmaz",
    name: "Yunus Yılmaz",
    role: "Rendering Artist",
    dept: "Rendering",
    image: img("yunus.png"),
    socials: { linkedin: "https://www.linkedin.com/in/yunusyilmazld/" },
  },

  {
    id: "bora-sik",
    name: "Bora Şık",
    role: "Video Editor",
    dept: "Rendering",
    image: img("bora.png"),
    socials: { linkedin: "https://www.linkedin.com/in/borask/" },
  },
];

export default function AboutTeam() {
  const [active, setActive] = useState<(typeof DEPARTMENTS)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return TEAM;
    return TEAM.filter((m) => m.dept === active);
  }, [active]);

  const counts = useMemo(() => {
    const out = { All: TEAM.length } as Record<(typeof DEPARTMENTS)[number], number>;
    DEPARTMENTS.forEach((d) => {
      if (d !== "All") out[d] = TEAM.filter((m) => m.dept === d).length;
    });
    return out;
  }, []);

  return (
    <section
      id="team"
      className="relative overflow-x-hidden" // ← prevent horizontal scroll
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* background (clipped) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-1/3 h-48 w-[140%] -translate-x-1/2 rotate-[-2deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.10),rgba(255,255,255,0.02),rgba(198,242,78,0.10))] blur-xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.25, margin: "-12% 0px -12% 0px" }}
          className="mb-6 md:mb-10"
        >
          <motion.div variants={CARD} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Users className="h-3.5 w-3.5 text-[#C6F24E]" />
            CONFIGGO Team
          </motion.div>
          <motion.h2 variants={CARD} className="typo-h2-md mt-3">
            Builders behind the <span className="text-[#C6F24E]">platform</span>
          </motion.h2>
          <motion.p variants={CARD} className="typo-small mt-2 max-w-[760px] text-white/70">
            Leadership, architecture, game engine, CRM & web, design, customer relations, and rendering teams shaping the product.
          </motion.p>
        </motion.div>

        {/* filter chips */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.25, margin: "-12% 0px -12% 0px" }}
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
                <span className="truncate">{d}</span>
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

        {/* grid */}
        <motion.ul
          key={active}
          variants={WRAP}
          initial={false}
          animate="show"
          whileInView="show"
          viewport={{ once: true, amount: 0.25, margin: "-12% 0px -12% 0px" }}
          className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((m) => (
            <motion.li key={m.id} variants={CARD} whileHover={{ y: -4, scale: 1.01 }} className="min-w-0">
              <TeamCard member={m} />
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.25, margin: "-12% 0px -12% 0px" }}
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
  const { name, role, dept, image, location, socials, badges } = member;
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
              priority={false}
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
        <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#C6F24E]/80 px-2 py-0.5 text-[10px] font-medium text-black">
            {dept}
          </span>
          {badges?.map((b) => (
            <span key={b} className="rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] text-white/85">
              {b}
            </span>
          ))}
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
          <div className="min-w-0">
            <div className="truncate text-white font-[500]">{name}</div>
            <div className="truncate text-[12px] text-white/65">{role}</div>
          </div>
          {/* socials */}
          <div className="flex shrink-0 items-center gap-2">
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
      target="_blank"
      rel="noopener noreferrer"
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
