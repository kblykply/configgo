// app/digital-twin/page.tsx
import PrivacyPolicySection from "../components/legal/PrivacyPolicySection";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy of Configgo. Learn how we handle your data and protect your privacy while using our services.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
   <PrivacyPolicySection />
    </main>
  );
}
