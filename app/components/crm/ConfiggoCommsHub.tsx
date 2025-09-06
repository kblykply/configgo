// app/components/configgo/ConfiggoCommsHub.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  MessageSquare,
  Mail,
  PhoneCall,
  Mic,
  Paperclip,
  Send,
  Bot,
  CheckCircle2,
  Clock,
  ChevronDown,
  Filter,
  User,
  CalendarClock,
} from "lucide-react";

type Channel = "All" | "WhatsApp" | "SMS" | "Email" | "Voice";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};

const CHANNELS: { key: Channel; label: string; Icon: any }[] = [
  { key: "All",      label: "All",       Icon: Filter },
  { key: "WhatsApp", label: "WhatsApp",  Icon: MessageCircle },
  { key: "SMS",      label: "SMS",       Icon: MessageSquare },
  { key: "Email",    label: "Email",     Icon: Mail },
  { key: "Voice",    label: "Voice",     Icon: PhoneCall },
];

const CONTACTS = [
  { id: "c1", initials: "MM", name: "Mert Mutlu",     last: "Interested in 2+1", channel: "WhatsApp" as Channel },
  { id: "c2", initials: "AK", name: "Ayşe Kaya",      last: "Sent: floor plan",  channel: "Email"    as Channel },
  { id: "c3", initials: "ST", name: "Selim Tunç",     last: "Missed call",       channel: "Voice"    as Channel },
  { id: "c4", initials: "LS", name: "Lina Serdar",    last: "SMS: budget 300k",  channel: "SMS"      as Channel },
];

const MESSAGE_FLOW = [
  { id: "m1", me: false, text: "Hi! I saw Vega Center. Is 2+1 available around $230k?", channel: "WhatsApp" as Channel },
  { id: "m2", me: true,  text: "Yes — A-12 is available at $235k. I can share a floor plan.", channel: "WhatsApp" as Channel },
  { id: "m3", me: false, text: "Please send the plan and schedule a visit this week.", channel: "WhatsApp" as Channel },
  { id: "m4", me: true,  text: "Sending plan via email. Visit Thursday 15:30 works?", channel: "Email" as Channel },
  { id: "m5", me: false, text: "Thursday works. Thanks!", channel: "WhatsApp" as Channel },
];

export default function ConfiggoCommsHub() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  const [channel, setChannel] = useState<Channel>("All");

  const visibleContacts = useMemo(() => {
    if (channel === "All") return CONTACTS;
    return CONTACTS.filter((c) => c.channel === channel);
  }, [channel]);

  return (
    <section ref={ref} className="relative" id="comms">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Omnichannel communication hub
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            One inbox for <span className="text-[#C6F24E]">WhatsApp, SMS, Email & Voice</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — value & features */}
          <motion.aside variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5">
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Work from a single inbox. Templates, sequences and SLAs keep follow-ups on time.
              Every conversation writes back to the deal timeline automatically.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: MessageCircle, txt: "Unified threads across WhatsApp, SMS, Email & Voice" },
                { Icon: Bot,           txt: "Templates & sequences with merge fields" },
                { Icon: Clock,         txt: "Response-time SLAs and idle escalations" },
                { Icon: CheckCircle2,  txt: "Auto-log to pipeline and contact timeline" },
              ].map(({ Icon, txt }) => (
                <motion.li key={txt} variants={ITEM} className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-[#C6F24E]" />
                  </div>
                  <span className="typo-small text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* mini SLA / visit preview */}
            <motion.div variants={ITEM} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Clock className="h-4 w-4 text-[#C6F24E]" /> First Reply SLA: <span className="ml-1 rounded-full bg-[#C6F24E]/15 px-2 py-0.5 text-[11px] text-[#C6F24E] ring-1 ring-[#C6F24E]/30">15m</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <CalendarClock className="h-4 w-4 text-[#C6F24E]" /> Visit scheduled: Thu 15:30 — Sales Center A
              </div>
            </motion.div>
          </motion.aside>

          {/* RIGHT — unified inbox visual */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 text-xs text-white/60">Configgo · Inbox</div>
              </div>

              <div className="relative aspect-[16/9]">
                {/* top filters */}
                <div className="absolute left-0 right-0 top-0 z-10 border-b border-white/10 bg-white/5 px-3 py-2">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {CHANNELS.map(({ key, label, Icon }) => {
                      const active = channel === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setChannel(key)}
                          className={[
                            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition",
                            active
                              ? "bg-[#C6F24E] text-black border-transparent"
                              : "bg-white/10 text-white/85 border-white/15 hover:bg-white/15",
                          ].join(" ")}
                        >
                          <Icon className="h-3.5 w-3.5" /> {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-pane layout */}
                <div className="absolute inset-0 top-[36px] grid grid-cols-12 gap-0">
                  {/* left: contacts */}
                  <div className="col-span-3 hidden border-r border-white/10 bg-white/[0.03] p-2 md:block">
                    <ul className="space-y-2">
                      {visibleContacts.map((c, i) => (
                        <motion.li
                          key={c.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 0.05 * i } }}
                        >
                          <button className="group flex w-full items-center gap-3 rounded-lg border border-transparent bg-white/0 px-2 py-2 text-left hover:border-white/10 hover:bg-white/[0.04]">
                            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 text-white text-sm">
                              {c.initials}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm text-white">{c.name}</div>
                              <div className="truncate text-xs text-white/60">{c.last}</div>
                            </div>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* middle: conversation */}
                  <div className="col-span-12 md:col-span-7 flex flex-col">
                    <div className="flex-1 space-y-3 overflow-auto p-3 md:p-4">
                      {/* animated bubbles */}
                      {MESSAGE_FLOW.map((m, i) => (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 0.06 * i } }}
                          className={[
                            "max-w-[88%] rounded-2xl px-3 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.35)] ring-1",
                            m.me
                              ? "ml-auto bg-[#C6F24E]/15 text-white ring-[#C6F24E]/25"
                              : "bg-white/[0.06] text-white ring-white/10",
                          ].join(" ")}
                        >
                          <div className="mb-1 flex items-center gap-2 text-[10px] text-white/60">
                            {m.channel === "WhatsApp" && <MessageCircle className="h-3.5 w-3.5 text-[#C6F24E]" />}
                            {m.channel === "SMS" && <MessageSquare className="h-3.5 w-3.5 text-[#C6F24E]" />}
                            {m.channel === "Email" && <Mail className="h-3.5 w-3.5 text-[#C6F24E]" />}
                            {m.channel === "Voice" && <PhoneCall className="h-3.5 w-3.5 text-[#C6F24E]" />}
                            <span>{m.channel}</span>
                            <span>•</span>
                            <span>just now</span>
                          </div>
                          <div className="text-sm leading-snug">{m.text}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* composer */}
                    <div className="border-t border-white/10 bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85 hover:bg-white/15">
                          <Bot className="h-3.5 w-3.5" /> Template <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                        <div className="flex-1">
                          <input
                            placeholder="Write a message…"
                            className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-white/20"
                          />
                        </div>
                        <button
                          className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/10 hover:bg-white/15"
                          title="Attach"
                        >
                          <Paperclip className="h-4 w-4 text-white/80" />
                        </button>
                        <button
                          className="inline-flex items-center gap-2 rounded-lg bg-[#C6F24E] px-3 py-2 text-sm text-black hover:brightness-95"
                          title="Send"
                        >
                          <Send className="h-4 w-4" /> Send
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* right: contact timeline */}
                  <div className="col-span-2 hidden border-l border-white/10 bg-white/[0.02] p-3 md:block">
                    <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
                      <User className="h-3.5 w-3.5" /> Timeline
                    </div>
                    <ul className="space-y-3">
                      {[
                        { t: "15:12", e: "Offer sent for A-12" },
                        { t: "14:28", e: "Email opened — floor plan" },
                        { t: "13:01", e: "WhatsApp reply received" },
                        { t: "12:42", e: "Sequence started: 2+1 follow-up" },
                      ].map((row, i) => (
                        <motion.li
                          key={row.t + row.e}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 0.05 * i } }}
                          className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xs"
                        >
                          <div className="mb-1 flex items-center justify-between text-white/70">
                            <span>{row.e}</span>
                            <span className="text-white/40">{row.t}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-white/55">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#C6F24E]" />
                            Logged to deal
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* inner ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {/* note */}
            <p className="typo-small mt-4 text-white/60">
              Templates pull project & unit fields automatically. Replies thread across channels and sync to the deal.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
