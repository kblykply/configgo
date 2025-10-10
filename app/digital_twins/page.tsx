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
import DTInteriorTour from "../components/digital-twin/DTInteriorTour";
import DTFilterApartments from "../components/digital-twin/DTFilterApartments";
import DTAmenities from "../components/digital-twin/DTAmenities";
import DTFirstPersonTour from "../components/digital-twin/DTFirstPersonTour";
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
            <DTInteriorTour />

        <DTAuthenticity />
                <DTFilterApartments />

        <DTDigitalCity />
                <DTAmenities   />

        <DTSurrounding />
                <DTFirstPersonTour />

        <DTFutureIntegration />
        <DTInteractiveDiscovery />
        <DTTimesOfDay />    
        <DTCaseStudies />
    </main>
  );
}
