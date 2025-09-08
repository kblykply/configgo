// app/components/NewsSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { getAllPosts, type BlogPost } from "@/data/blogs";

/* ---------------- Motion ---------------- */
const wrap: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1], staggerChildren: 0.06, when: "beforeChildren" },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] } },
};

/* ---------------- Types ---------------- */
type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // "DD.MM.YYYY"
  image: string;
  href: string;
};

/* ---------------- Helpers ---------------- */
function formatDateDDMMYYYY(isoOrOther: string) {
  // If already like "DD.MM.YYYY", return as-is
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(isoOrOther)) return isoOrOther;
  const d = new Date(isoOrOther);
  if (isNaN(+d)) return isoOrOther;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function mapBlogToPost(b: BlogPost): Post {
  return {
    id: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category.toUpperCase(),
    date: formatDateDDMMYYYY(b.date),
    image: b.cover,
    href: `/blog/${b.slug}`,
  };
}

/* ---------------- Component ---------------- */
export default function NewsSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  // pull data from /data/blogs.ts
  const blogs = getAllPosts(); // already sorted by date desc in your helper
  const mapped = blogs.map(mapBlogToPost);
  const featured = mapped[0];
  const posts = mapped.slice(1, 4); // next three

  if (!featured) return null;

  return (
    <section ref={rootRef} className="relative overflow-hidden py-12 md:py-16">
            {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 640px at 70% 6%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(900px 520px at 18% 48%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1450px] px-6 md:px-10">
                {/* header row */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-white/50 text-sm">Blog</span>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/25 to-white/60" />
            <Link
              href="/blog"
              className="text-sm text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1"
            >
              See all
            </Link>
          </div>
          <h2 className="text-[28px] md:text-[40px] leading-tight font-semibold tracking-[-0.02em] text-white">
            Browse <span className="text-white/80">Our News</span>
          </h2>
        </div>

         <motion.div
  variants={wrap}
  initial="hidden"
  whileInView="show"
  viewport={{ amount: 0.30, margin: "-100px 0px -100px 0px", /* once: false by default */ }}
  className="space-y-6 md:space-y-8"
>
          {/* -------- Featured (from BLOGS[0]) -------- */}
          <motion.article
            variants={item}
            className="relative grid grid-cols-1 md:grid-cols-12 gap-0 rounded-2xl overflow-hidden ring-1 ring-white/10
                       bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)]
                       shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_28px_70px_rgba(0,0,0,0.5)]"
          >
            {/* left image */}
            <div className="md:col-span-5 relative">
              <div className="relative w-full h-[220px] md:h-full">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width:1450px) 560px, (min-width:1024px) 40vw, 100vw"
                  priority
                />
              </div>
            </div>

            {/* right content */}
            <div className="md:col-span-7 relative p-6 md:p-8 lg:p-10">
              <div className="mb-6 flex items-center justify-between text-[12px] tracking-wide">
                <span className="text-white/45">{featured.category}</span>
                <time className="text-white/45">{featured.date}</time>
              </div>
              <h3 className="text-white text-[20px] md:text-[22px] lg:text-[24px] leading-[1.35] font-medium max-w-[60ch]">
                {featured.title}
              </h3>
              <p className="mt-4 text-white/70 leading-7 text-[15px] max-w-[70ch]">
                {featured.excerpt}
              </p>

              {featured.href && (
                <div className="mt-6">
                  <Link
                    href={featured.href}
                    className="inline-flex items-center gap-2 h-[40px] px-4 rounded-lg
                               text-[14px] text-black bg-[#C6F24E] hover:brightness-95
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F24E]/60"
                  >
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </motion.article>

          {/* -------- Bottom cards row -------- */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {posts.map((p) => (
              <SmallPostCard key={p.id} post={p} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Small Card ---------------- */
function SmallPostCard({ post }: { post: Post }) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl ring-1 ring-white/10
                 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)]
                 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_16px_40px_rgba(0,0,0,0.45)]
                 group"
    >
      <Link href={post.href} className="block focus-visible:outline-none">
        {/* media strip (left third on md+, top on mobile) */}
        <div className="relative w-full aspect-[16/9] md:absolute md:left-0 md:top-0 md:bottom-0 md:w-2/5">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width:1024px) 28vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 md:rounded-r-none rounded-t-2xl md:rounded-tl-2xl" />
        </div>

        {/* content */}
        <div className="relative p-5 md:pl-[calc(40%+18px)]">
          <div className="mb-3 flex items-center justify-between text-[11px] tracking-wide">
            <span className="text-white/45">{post.category}</span>
            <time className="text-white/45">{post.date}</time>
          </div>
          <p className="text-white/85 text-[14px] leading-6 line-clamp-3 md:line-clamp-2">{post.title}</p>
        </div>
      </Link>
    </article>
  );
}
