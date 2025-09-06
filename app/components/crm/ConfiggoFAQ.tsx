// app/components/configgo/ConfiggoFAQ.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

/* ---- exact header offset (your fixed header = 20vh) ---- */
const HEADER_OFFSET = "20vh";

/* ---- animations (no SSR-hidden state) ---- */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE, staggerChildren: 0.05 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

type Category = "General" | "Pricing" | "Security" | "Integrations" | "Implementation";
type FAQItem = {
  id: string;
  category: Category;
  q: string;
  a: string;
};

const CATEGORIES: Category[] = ["General", "Pricing", "Security", "Integrations", "Implementation"];

const FAQS: FAQItem[] = [
  {
    id: "what-is-configgo",
    category: "General",
    q: "What is Configgo and who is it for?",
    a: "Configgo is a real estate–focused CRM that unifies leads, inventory/availability, omnichannel messaging, and reporting. It's built for developers, brokers, and in-house sales teams handling multi-project portfolios.",
  },
  {
    id: "digital-twin",
    category: "General",
    q: "How does the Digital Twin add-on work?",
    a: "Embed 3D/360° experiences on your site or kiosks and sync real-time unit availability, pricing, and holds. Leads generated from the twin are captured in Configgo with full attribution.",
  },
  {
    id: "pricing-model",
    category: "Pricing",
    q: "How is pricing calculated?",
    a: "Pricing is per user, per month. Choose monthly or yearly billing (yearly includes a discount). See the Pricing section for plan limits and included features.",
  },
  {
    id: "switch-plans",
    category: "Pricing",
    q: "Can I change plans later?",
    a: "Yes. You can upgrade or downgrade at any time. When upgrading we prorate the remaining period so you only pay the difference.",
  },
  {
    id: "data-security",
    category: "Security",
    q: "How do you secure our data?",
    a: "We encrypt data in transit (TLS 1.2+) and at rest (AES-256). RBAC with field-level controls, immutable audit logs, daily backups, and optional SSO/SCIM on Enterprise.",
  },
  {
    id: "residency",
    category: "Security",
    q: "Do you support data residency?",
    a: "Yes. EU/US by default; Enterprise can choose EU/US/TR/MENA regions based on compliance and latency needs.",
  },
  {
    id: "integrations",
    category: "Integrations",
    q: "Which channels and tools integrate with Configgo?",
    a: "Native email/SMS, WhatsApp via providers, ad platforms and web forms, plus Zapier and REST API. You can push/pull leads, activities, and inventory data.",
  },
  {
    id: "api",
    category: "Integrations",
    q: "Is there an API?",
    a: "Yes, a REST API for leads, contacts, deals, inventory, activities, webhooks, and authentication. Rate limits and API keys are per environment.",
    // keep it concise—link your docs on your site when ready
  },
  {
    id: "migration",
    category: "Implementation",
    q: "Can you migrate us from spreadsheets or another CRM?",
    a: "Absolutely. We offer a guided import wizard for CSV/XLSX and templates for legacy CRMs. We preserve IDs/history and validate duplicates in a sandbox before go-live.",
  },
  {
    id: "time-to-live",
    category: "Implementation",
    q: "How long does implementation take?",
    a: "Most teams go live within 2–4 weeks: week 1 (design & mapping), week 2 (migration & channel connections), weeks 3–4 (training & launch).",
  },
];

export default function ConfiggoFAQ() {
  const [activeCat, setActiveCat] = useState<Category>("General");
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const inCat = f.category === activeCat;
      if (!q) return inCat;
      return (
        inCat &&
        (f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
      );
    });
  }, [activeCat, query]);

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const expandAll = () => setOpenIds(new Set(filtered.map((f) => f.id)));
  const collapseAll = () => setOpenIds(new Set());

  return (
    <section
      id="faq"
      className="relative"
      style={{ paddingTop: HEADER_OFFSET, scrollMarginTop: HEADER_OFFSET }}
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_140%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1100px] px-6 pb-16 md:pb-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="mb-8 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            FAQ
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Answers to <span className="text-[#C6F24E]">common questions</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-3 text-white/70">
            Can’t find what you’re looking for? Reach us via chat or email.
          </motion.p>
        </motion.div>

        {/* controls */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="mb-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* categories */}
          <motion.div variants={ITEM} className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  activeCat === c
                    ? "border-[#C6F24E]/40 bg-[#C6F24E] text-black"
                    : "border-white/15 bg-white/10 text-white/85 hover:bg-white/15",
                ].join(" ")}
                aria-pressed={activeCat === c}
              >
                {c}
              </button>
            ))}
          </motion.div>

          {/* search */}
          <motion.div
            variants={ITEM}
            className="relative w-full sm:w-[340px]"
            aria-label="Search FAQs"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search keywords…"
              className="w-full rounded-full border border-white/15 bg-white/10 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/30"
            />
          </motion.div>
        </motion.div>

        {/* list */}
        <motion.ul
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="space-y-3"
        >
          {filtered.map((f) => {
            const isOpen = openIds.has(f.id);
            const panelId = `faq-panel-${f.id}`;
            const btnId = `faq-button-${f.id}`;
            return (
              <motion.li key={f.id} variants={ITEM}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                  <button
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(f.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left"
                  >
                    <span className="inline-grid h-7 w-7 place-items-center rounded-md bg-white/10 ring-1 ring-white/15 text-[#C6F24E]">
                      <HelpCircle className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-white">{f.q}</span>
                    <ChevronDown
                      className={[
                        "h-5 w-5 transition-transform",
                        isOpen ? "rotate-180 text-[#C6F24E]" : "text-white/70",
                      ].join(" ")}
                    />
                  </button>

                  {/* panel */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="border-t border-white/10 px-4 py-3 text-sm text-white/80">
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* bulk actions + contact */}
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85 hover:bg-white/15"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85 hover:bg-white/15"
            >
              Collapse all
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-white/85 hover:bg-white/15"
            >
              <Mail className="h-4 w-4" /> Email us
            </a>
            <a
              href="/contact#chat"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#C6F24E] px-3 py-1.5 text-black"
            >
              <MessageCircle className="h-4 w-4" /> Live chat <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
