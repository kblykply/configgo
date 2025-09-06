// app/components/about/AboutContact.tsx
"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HeadphonesIcon,
  Handshake,
  Info,
} from "lucide-react";

/* --- header offset for your fixed header (≈20vh) --- */
const HEADER_OFFSET = "20vh";

/* --- animations (replay on every viewport enter) --- */
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
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.45, ease: EASE } },
};

export default function AboutContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // TODO: replace with your /api/contact POST
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  return (
    <section
      id="contact"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct bg: lime arc + micro-grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute -inset-x-16 top-10 h-44 rotate-[2deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.12),rgba(255,255,255,0.02),rgba(198,242,78,0.12))] blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-8 md:mb-12"
        >
          <motion.p variants={ITEM} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Sparkles className="h-3.5 w-3.5 text-[#C6F24E]" />
            Contact / work with us
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Tell us what you’re <span className="text-[#C6F24E]">building</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            Whether it’s Configgo CRM, Digital Twin, or a custom rollout—sales will respond within one business day.
          </motion.p>
        </motion.div>

        {/* layout: form (left) + direct lines & office (right) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* form */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-7"
          >
            <motion.div variants={ITEM} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-white/85">Send us a message</div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#C6F24E]" />
                  Data is encrypted in transit
                </span>
              </div>

              {status === "sent" ? (
                <SuccessPanel />
              ) : (
                <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* honeypot */}
                  <input type="text" name="company_site" className="hidden" tabIndex={-1} autoComplete="off" />

                  <Field label="Full name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:white/50 focus:ring-2 focus:ring-[#C6F24E]/40"
                      placeholder="Jane Doe"
                    />
                  </Field>

                  <Field label="Work email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:white/50 focus:ring-2 focus:ring-[#C6F24E]/40"
                      placeholder="jane@company.com"
                    />
                  </Field>

                  <Field label="Company" htmlFor="company">
                    <input
                      id="company"
                      name="company"
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:white/50 focus:ring-2 focus:ring-[#C6F24E]/40"
                      placeholder="Acme Developments"
                    />
                  </Field>

                  <Field label="Topic" htmlFor="topic">
                    <select
                      id="topic"
                      name="topic"
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#C6F24E]/40"
                      defaultValue="Sales"
                    >
                      <option className="bg-black" value="Sales">Sales / Demo</option>
                      <option className="bg-black" value="Support">Support</option>
                      <option className="bg-black" value="Partnerships">Partnerships</option>
                      <option className="bg-black" value="Press">Press</option>
                      <option className="bg-black" value="Careers">Careers</option>
                      <option className="bg-black" value="Other">Other</option>
                    </select>
                  </Field>

                  <Field label="Message" htmlFor="message" wide>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:white/50 focus:ring-2 focus:ring-[#C6F24E]/40"
                      placeholder="Tell us about your project, timeline and goals…"
                    />
                  </Field>

                  <div className="col-span-full flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-[12px] text-white/75">
                      <input type="checkbox" name="consent" required className="h-4 w-4 rounded border-white/20 bg-black" />
                      I agree to the{" "}
                      <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
                    </label>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm transition",
                        status === "sending" ? "bg-[#C6F24E]/60 text-black" : "bg-[#C6F24E] text-black hover:opacity-95",
                      ].join(" ")}
                    >
                      <Send className="h-4 w-4" />
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                  </div>
                </form>
              )}

              {/* subtle ring */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </motion.div>
          </motion.div>

          {/* direct lines & office */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-5 grid grid-cols-1 gap-5"
          >
            {/* quick routes */}
            <motion.div variants={ITEM} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <QuickCard
                icon={<MessageSquare className="h-4 w-4 text-[#C6F24E]" />}
                title="Sales / demo"
                k="sales@configgo.com"
                href="mailto:sales@configgo.com?subject=Demo%20request"
              />
              <QuickCard
                icon={<HeadphonesIcon className="h-4 w-4 text-[#C6F24E]" />}
                title="Support"
                k="support@configgo.com"
                href="mailto:support@configgo.com"
              />
              <QuickCard
                icon={<Handshake className="h-4 w-4 text-[#C6F24E]" />}
                title="Partnerships"
                k="partners@configgo.com"
                href="mailto:partners@configgo.com"
              />
              <QuickCard
                icon={<Mail className="h-4 w-4 text-[#C6F24E]" />}
                title="Press"
                k="press@configgo.com"
                href="mailto:press@configgo.com"
              />
            </motion.div>

            {/* phone & hours */}
            <motion.div variants={ITEM} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-white/85">
                <Phone className="h-4 w-4 text-[#C6F24E]" />
                Direct line
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-white/80">
                <a href="tel:+903120000000" className="underline-offset-2 hover:underline">+90 312 000 00 00</a>
                <span>·</span>
                <a href="https://wa.me/905550000000" className="underline-offset-2 hover:underline">WhatsApp</a>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-[12px] text-white/80 ring-1 ring-white/15">
                <Clock className="h-3.5 w-3.5 text-[#C6F24E]" />
                Mon–Fri 9:00–18:00 (TRT)
              </div>
            </motion.div>

            {/* office */}
            <motion.div variants={ITEM} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-white/85">
                <Building2 className="h-4 w-4 text-[#C6F24E]" />
                Ankara HQ
              </div>
              <div className="text-sm text-white/80">
                Mustafa Kemal Mah., Çankaya / Ankara<br />
                <span className="text-white/60">Istanbul office: Maslak, Sarıyer / Istanbul</span>
              </div>
              <div className="mt-3">
                <Link href="/about#offices" className="inline-flex items-center gap-1 text-[12px] text-white/75 hover:text-white">
                  See all offices <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* note */}
            <motion.div variants={ITEM} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[12px] text-white/70">
              <div className="mb-1 inline-flex items-center gap-2">
                <Info className="h-3.5 w-3.5 text-[#C6F24E]" />
                Looking for security docs?
              </div>
              Visit <Link href="/about#security" className="underline">Security & Trust</Link> or our{" "}
              <Link href="/legal" className="underline">Legal</Link> page.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function Field({
  label,
  htmlFor,
  wide,
  children,
}: {
  label: string;
  htmlFor: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "col-span-full" : ""}>
      <label htmlFor={htmlFor} className="mb-1 block text-[12px] text-white/70">
        {label}
      </label>
      {children}
    </div>
  );
}

function QuickCard({
  icon,
  title,
  k,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  k: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white/85 transition hover:bg-white/15"
    >
      <span className="inline-flex items-center gap-2">
        <span className="inline-grid h-8 w-8 place-items-center rounded-md bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
          {icon}
        </span>
        <span>
          <div className="text-white/90">{title}</div>
          <div className="text-[11px] text-white/60">{k}</div>
        </span>
      </span>
      <ArrowRight className="h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

function SuccessPanel() {
  return (
    <div className="rounded-2xl border border-[#C6F24E]/30 bg-[#C6F24E]/10 p-5 text-sm text-white/90">
      <div className="mb-1 text-white font-[500]">Thanks! Your message is on the way.</div>
      <div className="text-white/80">
        A teammate will reply within one business day. For urgent questions, call{" "}
        <a href="tel:+903120000000" className="underline">+90 312 000 00 00</a> or message us on{" "}
        <a href="https://wa.me/905550000000" className="underline">WhatsApp</a>.
      </div>
      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] text-white/85">
        <Clock className="h-3.5 w-3.5 text-[#C6F24E]" />
        Mon–Fri 9:00–18:00 (TRT)
      </div>
    </div>
  );
}
