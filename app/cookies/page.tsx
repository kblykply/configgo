import CookiesPolicySection from "../components/legal/CookiesPolicySection";

export const metadata = {
  title: "Cookies Policy",
  description:
    "Cookies Policy of Configgo. Learn how we use cookies and similar technologies on our website.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
   <CookiesPolicySection/>
    </main>
  );
}
