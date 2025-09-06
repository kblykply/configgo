// app/digital-twin/page.tsx
import DTHero from "../components/digital-twin/DTHero";
import DTAuthenticity from "../components/digital-twin/DTAuthenticity";
import DTDigitalCity from "../components/digital-twin/DTDigitalCity";
import DTSurrounding from "../components/digital-twin/DTSurrounding";
import DTFutureIntegration from "../components/digital-twin/DTFutureIntegration";
import DTInteractiveDiscovery from "../components/digital-twin/DTInteractiveDiscovery";
import DTTimesOfDay from "../components/digital-twin/DTTimesOfDay";
import DTCrmOverview from "../components/digital-twin/DTCrmOverview";
import DTCaseStudies from "../components/digital-twin/DTCaseStudies";
export const metadata = {
  title: "Digital Twin",
  description:
    "Effortless apartment filtering and availability with our Digital Twin experiences.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
        <DTCrmOverview />
      <DTHero />
        <DTAuthenticity />
        <DTDigitalCity />
        <DTSurrounding />
        <DTFutureIntegration />
        <DTInteractiveDiscovery />
        <DTTimesOfDay />    
        <DTCaseStudies />
    </main>
  );
}
