// app/components/contact/contact.tsx
"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  _gotcha?: string; // honeypot
};

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    _gotcha: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(
    () =>
      submitting ||
      !form.name.trim() ||
      !/^\S+@\S+\.\S+$/.test(form.email) ||
      !form.message.trim(),
    [form, submitting]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form._gotcha) return; // honeypot

    try {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 600)); // TODO replace with your API
      setSent(true);
      setForm({ name: "", email: "", phone: "", company: "", message: "", _gotcha: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="relative overflow-x-hidden" // prevent accidental horizontal scroll on mobile
      style={{
        paddingTop: "calc(var(--header-h, 72px) + 96px)",
        scrollMarginTop: "calc(var(--header-h, 72px) + 96px)",
        minHeight: "calc(100svh - var(--header-h, 72px))",
      }}
    >
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto w-full max-w-[1450px] px-6 pb-20">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="mb-10 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Let’s Talk
          </motion.p>
          <motion.h1
            variants={ITEM}
            className="typo-hero-light mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#C6F24E] md:text-[72px] break-words"
          >
            Contact Us
          </motion.h1>
          <motion.p variants={ITEM} className="typo-small mt-3 text-white/65">
            Tell us about your project or request a demo — we’ll get back within one business day.
          </motion.p>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Left: Info card */}
          <motion.aside
            variants={WRAP}
            initial={false}
            whileInView="show"
            viewport={{ amount: 0.2 }}
            className="md:col-span-5 min-w-0"
          >
            <motion.div
              variants={ITEM}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <h3 className="typo-h2-md text-white/95">Reach us directly</h3>
              <ul className="mt-5 space-y-4 text-white/80">
                <li>
                  <div className="text-sm">Email</div>
                  <div className="typo-small-heading break-words">hello@yourstudio.com</div>
                </li>
                <li>
                  <div className="text-sm">Phone</div>
                  <div className="typo-small-heading">+1 (617) 319-8242</div>
                </li>
                <li>
                  <div className="text-sm">Office</div>
                  <div className="typo-small-heading">Istanbul / Ankara, Türkiye</div>
                </li>
              </ul>

              <div className="mt-6 h-px w-full bg-white/10" />

              <p className="typo-small mt-6 text-white/65">
                Prefer email? Send your brief and assets, and we’ll reply with next steps and a time for a quick call.
              </p>
            </motion.div>
          </motion.aside>

          {/* Right: Form */}
          <motion.div
            variants={WRAP}
            initial={false}
            whileInView="show"
            viewport={{ amount: 0.2 }}
            className="md:col-span-7 min-w-0"
          >
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              {/* success / error */}
              {sent && (
                <div className="mb-4 rounded-lg border border-[#C6F24E]/30 bg-[#C6F24E]/10 px-4 py-3 text-sm text-[#D9FF71]">
                  Message sent — we’ll get back to you shortly.
                </div>
              )}
              {error && (
                <div className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {/* honeypot */}
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form._gotcha}
                onChange={(e) => setForm((s) => ({ ...s, _gotcha: e.target.value }))}
                className="hidden"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Your name"
                  required
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(v) => setForm((s) => ({ ...s, name: v }))}
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(v) => setForm((s) => ({ ...s, email: v }))}
                />
                <Field
                  label="Phone (optional)"
                  placeholder="+90 5xx xxx xx xx"
                  value={form.phone || ""}
                  onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
                />
                <Field
                  label="Company (optional)"
                  placeholder="Company / Developer"
                  value={form.company || ""}
                  onChange={(v) => setForm((s) => ({ ...s, company: v }))}
                />
              </div>

              <div className="mt-4">
                <FieldTextArea
                  label="Project details"
                  required
                  placeholder="Tell us about scope, timeline, budget range, and any links…"
                  rows={6}
                  value={form.message}
                  onChange={(v) => setForm((s) => ({ ...s, message: v }))}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={disabled}
                  className={[
                    "rounded-full px-5 py-3 text-sm transition",
                    disabled
                      ? "cursor-not-allowed bg-white/5 text-white/40"
                      : "bg-[#C6F24E] text-black hover:brightness-95",
                  ].join(" ")}
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>

                <span className="typo-small text-white/50">
                  By sending, you agree to be contacted about your inquiry.
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small field components ---------- */
function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "tel";
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-white/70">
        {label} {required && <span className="text-[#C6F24E]">*</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-white/20"
      />
    </label>
  );
}

function FieldTextArea({
  label,
  value,
  onChange,
  required,
  placeholder,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-white/70">
        {label} {required && <span className="text-[#C6F24E]">*</span>}
      </span>
      <textarea
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-white/20"
      />
    </label>
  );
}
