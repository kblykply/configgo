// app/digital-twin/page.tsx
import TermsOfServiceSection from "../components/legal/TermsOfServiceSection";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service of Configgo. Learn about the rules and regulations for using our services.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
   <TermsOfServiceSection />
    </main>
  );
}
