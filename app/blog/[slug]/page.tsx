  // app/blog/[slug]/page.tsx
  import Image from "next/image";
  import Link from "next/link";
  import { notFound } from "next/navigation";
  import { getPostBySlug } from "@/data/blogs";

  const ACCENT = "#C6F24E";

  export function generateStaticParams(): Array<{ slug: string }> {
    return [
      { slug: "interactive-walkthroughs-mobile" },
      { slug: "digital-twins-for-sales-centers" },
      { slug: "amenities-that-sell" },
      { slug: "digital-twin-guide-2025" },
    ];
  }

  export default async function BlogDetail(
    { params }: { params: Promise<{ slug: string }> }
  ) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

   return (
    <main className="min-h-svh bg-[var(--background)] text-white">
      <article
        className="
          mx-auto
          max-w-[1450px]             /* ⬅️ widened from 1100/1200 to 1450 */
          px-6 md:px-10
          pt-24 md:pt-32
          pb-16 md:pb-24
        "
      >
        <Link
          href="/blog"
          className="text-sm text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
        >
          ← Back to all
        </Link>

        <h1
          className="mt-4 text-[40px] leading-[1.05] md:text-[56px]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
        >
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/65">
          <span className="rounded-full bg-white/10 px-2 py-1 text-xs uppercase tracking-wide text-white/80">
            {post.category}
          </span>
          <span aria-hidden>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </time>
          <span aria-hidden>•</span>
          <span>{post.readTime} min read</span>
        </div>

        {/* Hero cover */}
        <div
          className="
            relative mt-8
            h-[46svh] min-h-[320px] max-h-[640px]
            overflow-hidden rounded-3xl
            ring-1 ring-white/10
            bg-white/[0.04]
             mb-8 md:mb-12   
          "
        >
          <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: `inset 0 -140px 200px -100px ${ACCENT}2a` }}
          />
        </div>

        <Prose content={post.content} />
      </article>
    </main>
  );
}

  type PostContent = NonNullable<ReturnType<typeof getPostBySlug>>["content"];

  function Prose({ content }: { content: PostContent }) {
    return (
      <div
        className={[
          "prose prose-invert max-w-none",
          // headings
          "prose-headings:font-medium prose-h2:tracking-tight",
          "prose-h2:mt-12 prose-h2:mb-4",
          // body
          "prose-p:text-white/80 prose-li:text-white/80",
          // links
          "prose-a:text-[#C6F24E] prose-a:no-underline hover:prose-a:brightness-110",
          // misc
          "prose-hr:border-white/10",
          "prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:text-white/80",
        ].join(" ")}
        style={{ ["--tw-prose-bullets" as any]: "rgba(255,255,255,0.6)" }}
      >
        {content.map((b, i) => {
          if (b.type === "h2") {
            return (
              <h2 key={i} style={{ fontFamily: "var(--font-heading)" }}>
                {b.text}
              </h2>
            );
          }
          if (b.type === "p") return <p key={i}>{b.text}</p>;
          if (b.type === "img") {
            return (
              <figure
                key={i}
                className="my-10 overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt || ""} className="block w-full" />
                {"caption" in b && b.caption ? (
                  <figcaption className="px-4 py-2 text-center text-sm text-white/60">
                    {b.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          if (b.type === "quote") {
            return (
              <blockquote
                key={i}
                className="my-10 border-l-2 pl-4"
                style={{ borderColor: ACCENT }}
              >
                <p className="text-white/80">{b.text}</p>
                {"cite" in b && b.cite ? (
                  <cite className="mt-1 block text-sm text-white/60">— {b.cite}</cite>
                ) : null}
              </blockquote>
            );
          }
          if (b.type === "list") {
            return (
              <ul key={i} className="my-6 list-disc pl-6 marker:text-white/60">
                {b.items.map((it, k) => (
                  <li key={k}>{it}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>
    );
  }
