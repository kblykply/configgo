// app/digital-twin/page.tsx
import DPASection from "../components/legal/DPASection";

export const metadata = {
  title: "Data Processing Agreement",
  description:
    "Data Processing Agreement of Configgo. Learn how we handle your data and protect your privacy while using our services.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
   <DPASection />
    </main>
  );
}
