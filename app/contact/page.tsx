// app/contact/page.tsx
import Contact from "../components/contact/contact";

export const metadata = {
  title: "Contact",
  description: "Get in touch about Digital Twin projects, demos, and partnerships.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
      <Contact />
    </main>
  );
}
