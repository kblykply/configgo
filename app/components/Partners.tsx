"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

type Partner = {
  name: string;
  src: string;
  width?: number;
  height?: number;
};

const PARTNERS: Partner[] = [
  { name: "Nata Holding", src: "/NATA-logobeyaz.png" },
  { name: "Zirve Beton", src: "/zirvebeton-LOGO-beyaz.png" },
  { name: "TR Holding", src: "/trholdingbeyazlogo.png" },
  { name: "Shelton", src: "/shelton-logo-beyaz.png" },
  { name: "Gallardo", src: "/gallardologobeyaz.png" },
  { name: "Onyx Portre", src: "/ONYX-PORTREbeyaz.png" },

  { name: "Nata Yaşam", src: "/natayasamlogo-beyaz.png" },
  { name: "Onyx Ankara", src: "/onyxlogobeyaz.png" },
  { name: "Sun City Antalya", src: "/suncitylogo-beyaz.png" },
  { name: "Vega Center", src: "/vegacenter-beyaz-logo.png" },
  { name: "Vis Botanik", src: "/image.png" },
  { name: "Marin Castro", src: "/marecastralogo-03.png" },

  { name: "Criter Rezidans", src: "/criter.png" },
  { name: "Villa İncekten", src: "/incek.png" },
  { name: "VIP Tower", src: "/vip.png" },
  { name: "Vkesif", src: "/kesif.png" },
  { name: "Orion Towers", src: "/orionlogo-beyaz.png" },
  { name: "Strada", src: "/stradalogo-beyaz.png" },
];

export default function Partners() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);

  // mouse target (tx,ty), animated (x,y), opacity target (to) and animated (o)
  const s = useRef({ tx: 0, ty: 0, x: 0, y: 0, to: 0, o: 0, running: false });

  const registerCard = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) cardEls.current[idx] = el;
  };

  const paintAll = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const gRect = grid.getBoundingClientRect();

    for (const el of cardEls.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const localX = s.current.x - (r.left - gRect.left);
      const localY = s.current.y - (r.top - gRect.top);
      el.style.setProperty("--mx", `${localX}px`);
      el.style.setProperty("--my", `${localY}px`);
      el.style.setProperty("--fog-o", `${s.current.o}`);
    }
  };

  const tick = () => {
    const kPos = 0.16;
    const kOp = 0.14;

    s.current.x += (s.current.tx - s.current.x) * kPos;
    s.current.y += (s.current.ty - s.current.y) * kPos;
    s.current.o += (s.current.to - s.current.o) * kOp;

    paintAll();

    // stop the loop when fully faded and no need to update
    if (s.current.o < 0.01 && s.current.to === 0) {
      s.current.o = 0;
      s.current.running = false;
      rafRef.current = null;
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    if (!s.current.running) {
      s.current.running = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    s.current.tx = e.clientX - rect.left;
    s.current.ty = e.clientY - rect.top;
    s.current.to = 1; // target visible while moving/inside
    startLoop();
  };

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    s.current.tx = e.clientX - rect.left;
    s.current.ty = e.clientY - rect.top;
    s.current.to = 1;
    startLoop();
  };

  const onMouseLeave = () => {
    // fade out smoothly
    s.current.to = 0;
    startLoop();
  };

  // center initial position & update on resize
  useEffect(() => {
    const center = () => {
      const grid = gridRef.current;
      if (!grid) return;
      const r = grid.getBoundingClientRect();
      s.current.tx = r.width / 2;
      s.current.ty = r.height / 2;
      s.current.x = s.current.tx;
      s.current.y = s.current.ty;
      paintAll();
    };
    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      aria-label="Partners"
      className="relative w-full bg-[#000000] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1450px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-8">
          <p className="typo-small-heading text-white/60">Configgo</p>
          <h2 className="typo-h2-md mt-2 text-white">Our Customers</h2>
        </div>

        {/* Grid wrapper captures the mouse */}
        <div
          ref={gridRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="relative"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {PARTNERS.map((p, i) => (
              <Card key={p.name} register={registerCard(i)}>
                <Logo {...p} />
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />
    </section>
  );
}

/* ---------- Card (clips the shared fog, opacity via --fog-o) ---------- */
function Card({
  children,
  register,
}: {
  children: React.ReactNode;
  register: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={register}
      className="
        group relative overflow-hidden
        rounded-xl border border-white/10
        bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
        transition
        hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]
      "
      style={{ aspectRatio: "16/10" }}
    >
      {/* Same global fog, clipped to the card. Opacity is driven by --fog-o. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `
            radial-gradient(160px 160px at var(--mx) var(--my),
              rgba(182,225,61,0.50) 0%,
              rgba(182,225,61,0.18) 42%,
              rgba(182,225,61,0.00) 70%
            ),
            radial-gradient(320px 320px at var(--mx) var(--my),
              rgba(182,225,61,0.12) 0%,
              rgba(182,225,61,0.00) 78%
            )
          `,
          filter: "saturate(115%)",
          opacity: "var(--fog-o, 0)",
          transition: "opacity 200ms ease",
        }}
      />
      <div className="relative z-20 grid h-full w-full place-items-center p-6">
        {children}
      </div>
    </div>
  );
}

/* ---------- Logo ---------- */
function Logo({ name, src, width, height }: Partner) {
  return (
    <Image
      src={src}
      alt={name}
      width={width ?? 220}
      height={height ?? 90}
      className="
        max-h-[56px] md:max-h-[64px] w-auto
        object-contain
        select-none
        brightness-0 invert
      "
      priority
    />
  );
}
