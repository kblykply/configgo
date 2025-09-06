// app/blog/page.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/data/blogs";
import type { BlogPost } from "@/data/blogs";

const ACCENT = "#C6F24E";

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  const railRef = useRef<HTMLDivElement>(null);
  const scrollRail = (dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const amt = Math.max(320, Math.round(el.clientWidth * 0.9));
    el.scrollBy({ left: dir === "left" ? -amt : amt, behavior: "smooth" });
  };

  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
      {/* Header */}
      <section className="mx-auto max-w-[1450px] px-4 pt-16 md:pt-40">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
          Discover Our Blog
        </div>
        <h1
          className="mt-4 font-[600] leading-none text-[44px] md:text-[56px] text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Blogs
        </h1>
      </section>

      {/* Featured */}
      {featured && (
        <section className="mx-auto grid max-w-[1450px] grid-cols-1 gap-6 px-4 py-10 md:grid-cols-2">
          {/* Left image */}
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <Image src={featured.cover} alt={featured.title} fill className="object-cover" priority />
          </div>

          {/* Right content card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0c0f0c]/70 px-6 py-6 md:px-8 md:py-8">
            {/* top row: badges + date */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide">
                <span
                  className="rounded-[10px] px-2 py-1 text-[10px] font-medium"
                  style={{ background: `${ACCENT}1a`, color: "#dbead1", border: `1px solid ${ACCENT}33` }}
                >
                  {featured.category}
                </span>
                <span
                  className="rounded-[10px] px-2 py-1 text-[10px] font-medium text-white/80"
                  style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}
                >
                  {featured.readTime} mins read
                </span>
              </div>
              <span className="text-[11px] text-white/50 mt-1">{new Date(featured.date).toLocaleDateString()}</span>
            </div>

            <h2 className="mt-4 text-2xl md:text-3xl text-white" style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}>
              {featured.title}
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">{featured.excerpt}</p>

            <div className="mt-6 flex items-center justify-between">
              <Link href={`/blog/${featured.slug}`} className="group inline-flex items-center gap-2 text-sm text-white/80">
                See all <span className="transition -translate-x-0.5 group-hover:translate-x-0">→</span>
              </Link>

              <div className="flex items-center gap-2 text-xs text-white/60">
                <span>Read Time</span>
                <span className="inline-flex items-center rounded-full border border-white/10 px-2 py-0.5 text-white/70">
                  {featured.readTime} min
                </span>
              </div>
            </div>

            {/* soft corner glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl"
              style={{
                boxShadow: `0 0 140px 36px ${ACCENT}1a`,
                maskImage: "radial-gradient(200px 200px at 100% 0%, black, transparent)",
              }}
            />
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="mx-auto max-w-[1450px] px-4 pb-20">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-white/90" style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: 22 }}>
              Our Recent Articles
            </h3>
            <p className="text-sm text-white/60">Lorem ipsum dolor sit amet consectetur.</p>
          </div>

          {/* arrow controls */}
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scrollRail("left")}
              className="h-8 w-8 rounded-md border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.06]"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={() => scrollRail("right")}
              className="h-8 w-8 rounded-md border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.06]"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 md:grid-cols-3 md:overflow-x-visible overflow-x-auto scroll-smooth"
        >
          {rest.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide">
          <span
            className="rounded-[10px] px-2 py-1 text-[10px] font-medium"
            style={{ background: `${ACCENT}1a`, color: "#dbead1", border: `1px solid ${ACCENT}33` }}
          >
            Discover Our Blog
          </span>
        </div>

        <h4 className="text-base text-white" style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}>
          {post.title}
        </h4>

        <p className="line-clamp-3 text-sm text-white/70">{post.excerpt}</p>

        <div className="pt-1">
          <Link href={`/blog/${post.slug}`} className="group/read inline-flex items-center gap-2 text-sm text-white/80">
            Read <span className="transition -translate-x-0.5 group-hover/read:translate-x-0">→</span>
          </Link>
        </div>
      </div>

      {/* green vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 160px 40px ${ACCENT}22` }}
      />
    </article>
  );
}
    