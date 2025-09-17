// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NAV = [
  { label: "Home Page", href: "/" },
  { label: "CRM", href: "/crm" },
  { label: "Digital Twins", href: "/digital_twins" },
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
];

type Props = {
  headerHeight?: number;
  hLineTop?: number;
  vLineLeft?: number;
  vLineHeight?: number;
  showHairlines?: boolean;
};

type Notification = {
  id: string;
  title: string;
  body: string;
  time: string; // e.g. '2h', 'Yesterday'
  href?: string;
  unread?: boolean;
  kind?: "alert" | "mail" | "chat" | "megaphone";
};

const INITIAL_NOTIFS: Notification[] = [
  {
    id: "n1",
    title: "New lead assigned",
    body: "Shelton Visalia • Source: Web form / UTM: google-cpc",
    time: "2m",
    unread: true,
    kind: "megaphone",
    href: "/crm/leads/789",
  },
  {
    id: "n2",
    title: "Document signed",
    body: "Vega Center – Offer #A-214 was e-signed",
    time: "1h",
    unread: true,
    kind: "mail",
    href: "/crm/offers/A-214",
  },
  {
    id: "n3",
    title: "Comment in Digital Twin",
    body: "Paryal Bağlıca • ‘Update sunpath overlay for Block B’",
    time: "Yesterday",
    unread: false,
    kind: "chat",
    href: "/digital_twins/projects/p3#comments",
  },
  {
    id: "n4",
    title: "Price book updated",
    body: "ONYX Potre • 12 units adjusted (+1.8%)",
    time: "2d",
    unread: false,
    kind: "alert",
    href: "/crm/inventory/pricebooks/onyx",
  },
];

export default function Header({
  headerHeight = 96,
  hLineTop = 96,
  vLineLeft = 260,
  vLineHeight = 668,
  showHairlines = true,
}: Props) {
  const H_GRAD =
    "linear-gradient(90deg, #060606 0%, #848484 50%, #0A0A0A 100%)";
  const V_GRAD =
    "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.32) 14.36%, rgba(255,255,255,.18) 36.07%, rgba(255,255,255,0) 100%)";

  const [mounted, setMounted] = useState(false);
  const [showHamb, setShowHamb] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // notifications
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const unreadCount = notifs.filter((n) => n.unread).length;

  const notifBtnRef = useRef<HTMLButtonElement | null>(null);
  const notifPanelRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => setMounted(true), []);

  // show floating hamburger after header height (desktop only visual)
  useEffect(() => {
    const onScroll = () => setShowHamb((window.scrollY || 0) > headerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerHeight]);

  // close menus via ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // click outside to close notifications
  useEffect(() => {
    if (!notifOpen) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        notifPanelRef.current?.contains(t) ||
        notifBtnRef.current?.contains(t)
      )
        return;
      setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [notifOpen]);

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <>
      {/* HEADER (non-sticky) */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="relative" style={{ height: headerHeight }}>
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-[auto_1fr_auto] items-center px-6">
            {/* Logo — always visible */}
       <Link href="/" aria-label="Home" className="inline-flex items-center">
  <img
    src="/configgo-yeni-logo-beyaz.png"
    alt="Logo"
    className="block h-6 md:h-7 w-auto" // smaller height
  />
</Link>

            {/* Center Nav — desktop only */}
            <nav className="hidden md:flex justify-center">
              <ul className="flex items-center gap-8 whitespace-nowrap">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[15px] font-normal text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

          {/* Right controls */}
<div className="relative col-start-3 flex items-center gap-3 justify-self-end">
{/* MOBILE HAMBURGER (inline in header) */}
<button
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  onClick={() => setMenuOpen(v => !v)}
  className={`
    md:hidden ml-auto grid h-10 w-10 place-items-center rounded-xl
    backdrop-blur-xl transition active:translate-y-[1px]
    ring-1 ring-white/15
    hover:scale-[1.04]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
    ${menuOpen ? "bg-white/10" : ""}
  `}
  style={{
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 22px rgba(0,0,0,0.35)",
  }}
>
  <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>

  <div className="relative h-5 w-6">
    {/* Line 1 */}
    <span
      className={`absolute left-0 top-0 h-[2px] w-6 rounded-full bg-white transition-all duration-300
        ${menuOpen ? "top-[9px] rotate-45" : ""}
      `}
    />
    {/* Line 2 */}
    <span
      className={`absolute left-0 top-[9px] h-[2px] w-6 rounded-full bg-white transition-all duration-300
        ${menuOpen ? "opacity-0" : "opacity-100"}
      `}
    />
    {/* Line 3 */}
    <span
      className={`absolute left-0 top-[18px] h-[2px] w-6 rounded-full bg-white transition-all duration-300
        ${menuOpen ? "top-[9px] -rotate-45" : ""}
      `}
    />
  </div>
</button>


              {/* DESKTOP: Contact + Notifications */}
              <div className="hidden md:flex items-center gap-3">
                {/* Contact */}
                <Link
                  href="/contact"
                  className="relative inline-grid h-10 place-items-center rounded-[12px] px-4 text-[15px] font-medium text-black transition active:translate-y-[1px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-[12px]"
                    style={{ background: "linear-gradient(180deg,#C6F24E 0%,#A9D536 100%)" }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-[12px]"
                    style={{ boxShadow: "inset 0 0 0 2px rgba(64,79,22,.55)" }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-[12px]"
                    style={{
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 2px rgba(0,0,0,.22), 0 6px 18px rgba(198,242,78,.25)",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-1.5">
                    Contact <span aria-hidden>↗</span>
                  </span>
                </Link>

                {/* Notifications */}
                <button
                  ref={notifBtnRef}
                  aria-label="Notifications"
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative grid h-10 w-10 place-items-center rounded-full text-black transition active:translate-y-[1px]"
                  title="Notifications"
                  style={{
                    background:
                      "linear-gradient(180deg,#C6F24E 0%,#9FCC2E 100%)",
                    boxShadow:
                      "inset 0 0 0 2px rgba(64,79,22,.55), inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 2px rgba(0,0,0,.22), 0 5px 14px rgba(198,242,78,.25)",
                  }}
                >
                  {/* bell */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 5 3 9H3c0-4 3-2 3-9" />
                    <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" />
                  </svg>

                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-black px-1 text-[11px] font-medium text-white ring-1 ring-black/40">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Popover (desktop only because parent is hidden on mobile) */}
                <div
                  ref={notifPanelRef}
                  className={`absolute right-0 top-[calc(100%+8px)] z-40 w-[92vw] max-w-[420px] overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.04))] shadow-[0_20px_80px_rgba(0,0,0,.55)] backdrop-blur-2xl transition-all ${
                    notifOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)" }}
                  role="dialog"
                  aria-modal="false"
                  aria-labelledby="notif-title"
                >
                  {/* header */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-grid h-7 w-7 place-items-center rounded-md bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                        {/* small bell */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 5 3 9H3c0-4 3-2 3-9" />
                          <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" />
                        </svg>
                      </span>
                      <div className="text-white/90" id="notif-title">
                        Notifications
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <button
                        onClick={markAllRead}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-white/85 hover:bg-white/15"
                      >
                        Mark all read
                      </button>
                      <Link
                        href="/notifications"
                        onClick={() => setNotifOpen(false)}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-white/85 hover:bg-white/15"
                      >
                        View all
                      </Link>
                    </div>
                  </div>

                  {/* list */}
                  <ul className="max-h-[60vh] overflow-auto p-2">
                    {notifs.map((n) => (
                      <li key={n.id}>
                        <Link
                          href={n.href || "#"}
                          onClick={() => setNotifOpen(false)}
                          className={[
                            "group block rounded-xl border p-3 transition",
                            n.unread
                              ? "border-[#C6F24E]/30 bg-[#C6F24E]/10"
                              : "border-white/10 bg-white/6 hover:bg-white/10",
                          ].join(" ")}
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 inline-grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-black/40 ring-1 ring-white/15">
                              {renderNotifIcon(n.kind)}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-sm text-white/90">
                                  {n.title}
                                </span>
                                {n.unread && (
                                  <span className="rounded-full bg-[#C6F24E] px-1.5 py-0.5 text-[10px] font-medium text-black">
                                    New
                                  </span>
                                )}
                                <span className="ml-auto text-[11px] text-white/60">
                                  {n.time}
                                </span>
                              </div>
                              <p className="mt-0.5 line-clamp-2 text-[12px] text-white/75">
                                {n.body}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                    {notifs.length === 0 && (
                      <li className="p-4 text-center text-sm text-white/70">
                        No notifications
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Hairlines */}
            {showHairlines && mounted && (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0"
                  style={{
                    top: `${hLineTop}px`,
                    height: "1px",
                    backgroundImage: H_GRAD,
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    top: `${headerHeight - 90}px`,
                    left: `${vLineLeft}px`,
                    width: "1px",
                    height: `${vLineHeight}px`,
                    backgroundImage: V_GRAD,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </header>

      {/* FLOATING HAMBURGER — desktop only after scroll */}
<button
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  onClick={() => setMenuOpen((v) => !v)}
  className={`fixed right-4 top-4 z-40 h-12 w-12 rounded-2xl
              backdrop-blur-xl transition
              shadow-[0_8px_25px_rgba(0,0,0,0.35)]
              ${showHamb ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]`}
  style={{
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.12)",
  }}
>
  <span className="sr-only">Menu</span>
  <div className="relative mx-auto flex h-6 w-6 items-center justify-center">
    {/* DOTS → CROSS */}
    <span
      className={`absolute h-[6px] w-[6px] rounded-full bg-white transition-all duration-300
                  ${menuOpen ? "rotate-45 scale-125" : "-translate-x-2"}`}
    />
    <span
      className={`absolute h-[6px] w-[6px] rounded-full bg-white transition-all duration-300
                  ${menuOpen ? "-rotate-45 scale-125" : "translate-x-2"}`}
    />
  </div>
</button>



      {/* CENTERED GLASS MODAL MENU */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 transition ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* scrim */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

       {/* dialog */}
<div className="absolute inset-0 flex items-start md:items-center justify-center p-0 md:p-6">
  <div
    className={`overflow-hidden flex flex-col
                w-screen h-[100dvh] rounded-none border-0
                md:w-full md:max-w-[720px] md:max-h-[90dvh] md:rounded-3xl md:border md:border-white/15
                shadow-[0_30px_100px_rgba(0,0,0,0.55)]
                backdrop-blur-2xl
                transition-[transform,opacity,filter] duration-300
                ${menuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.98] -translate-y-2"}`}
    style={{
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
      // notch-safe padding on iOS
      paddingTop: "env(safe-area-inset-top)",
      paddingBottom: "env(safe-area-inset-bottom)",
      filter: menuOpen ? "blur(0px)" : "blur(1px)",
    }}
    role="dialog"
    aria-modal="true"
  >
    {/* header row inside dialog (fixed) */}
    <div className="flex items-center justify-between gap-3 px-5 pt-5 shrink-0">
      <div className="flex items-center gap-3">
        <img src="/configgo-yeni-logo-beyaz.png" alt="Configgo" className="h-6 w-auto" />
        <span
          className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] text-white/85"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Menu
        </span>
      </div>
<button
  onClick={() => setMenuOpen(false)}
  aria-label="Close menu"
  className={`
    grid h-10 w-10 place-items-center rounded-xl
    backdrop-blur-xl transition
    ring-1 ring-white/15
    hover:scale-[1.05] hover:bg-white/10
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
  `}
  style={{
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 22px rgba(0,0,0,0.35)",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"   // ✅ force white stroke
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-300 group-hover:rotate-90"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
</button>


    </div>

    {/* search (fixed) */}
    <div className="px-5 pt-3 shrink-0">
      <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          placeholder="Search pages…"
          className="w-full bg-transparent text-[14px] text-white placeholder:text-white/50 outline-none"
          autoFocus
        />
        <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/65">
          ⌘K
        </span>
      </div>
    </div>

    {/* content grid (scrolls) */}
    <div className="px-5 py-5 overflow-y-auto grow">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
       {/* primary nav */}
<div className="md:col-span-7">
  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 [grid-auto-rows:1fr]">
    {NAV.map((item) => (
      <li key={item.label} className="h-full">
        <Link
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className="group flex h-full flex-col rounded-2xl border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
        >
          <div
            className="text-[15px] text-white/90 group-hover:text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {item.label}
          </div>

          {/* subtitle — clamp to 2 lines so all tiles equalize */}
          <div
            className="mt-1 text-[12px] leading-[1.45] text-white/60"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "calc(1em * 1.45 * 2)", // reserve space for 2 lines
            }}
          >
            {item.label === "Projects" && "Case studies & real deployments"}
            {item.label === "CRM" && "Configgo CRM overview"}
            {item.label === "Digital Twins" && "Interactive 3D + live availability"}
            {item.label === "About" && "Team, story, careers"}
            {item.label === "Blog" && "Product updates & learnings"}
          </div>

          {/* footer — stuck to bottom */}
          <div className="mt-auto pt-3 flex items-center gap-2 text-[12px] text-white/75">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C6F24E]" />
            Open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-90"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        </Link>
      </li>
    ))}
  </ul>
</div>


        {/* quick actions / highlights */}
        <div className="md:col-span-5 space-y-3">
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="relative block overflow-hidden rounded-2xl border border-white/15 p-4 transition hover:opacity-95"
            style={{ background: "linear-gradient(180deg,#C6F24E1F,rgba(255,255,255,0.06))" }}
          >
            <div className="flex items-center justify-between">
              <div className="text-white/90">
                <div className="text-[13px]">Talk to sales</div>
                <div className="text-[20px] leading-6" style={{ fontFamily: "var(--font-heading)" }}>
                  Book a demo
                </div>
              </div>
              <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-black/30 text-white ring-1 ring-white/15">
                ↗
              </span>
            </div>
            <div className="mt-2 text-[11px] text-white/70">First response within 24h (TRT)</div>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/crm#pricing"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-white/15 bg-white/10 p-3 text-[13px] text-white/85 hover:bg-white/15"
            >
              Pricing
            </Link>
            <Link
              href="/about-us#careers"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-white/15 bg-white/10 p-3 text-[13px] text-white/85 hover:bg-white/15"
            >
              Careers
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-[12px] text-white/70">
            <div className="mb-1 text-white/85">Contact</div>
            <div className="flex flex-wrap items-center gap-2">
              <a href="mailto:hello@configgo.com" className="underline-offset-2 hover:underline">hello@configgo.com</a>
              <span>·</span>
              <a href="tel:+903120000000" className="underline-offset-2 hover:underline">+90 312 000 00 00</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* footer (fixed) */}
    <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-[12px] text-white/70 md:flex-row shrink-0">
      <div>© {new Date().getFullYear()} Configgo</div>
      <div className="flex items-center gap-3">
        <Link href="/legal/privacy" onClick={() => setMenuOpen(false)} className="hover:text-white">Privacy</Link>
        <span>·</span>
        <Link href="/legal/terms" onClick={() => setMenuOpen(false)} className="hover:text-white">Terms</Link>
      </div>
    </div>
  </div>
</div>

      </div>
    </>
  );
}

/* ---------- helpers ---------- */
function renderNotifIcon(kind: Notification["kind"]) {
  const cls = "h-4 w-4";
  switch (kind) {
    case "mail":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      );
    case "chat":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      );
    case "megaphone":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 11 18-5v12L3 13v8" />
          <path d="M11 19a2 2 0 1 1-4 0" />
        </svg>
      );
    case "alert":
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
  }
}
