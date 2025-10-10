// app/configgo/page.tsx
import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutPillars from "../components/about/AboutPillars";
import AboutImpact from "../components/about/AboutImpact";
import AboutTimeline from "../components/about/AboutTimeline";
import AboutTeam from "../components/about/AboutTeam";
import AboutValues from "../components/about/AboutValues";
import AboutOffices from "../components/about/AboutOffices";
import AboutSecurity from "../components/about/AboutSecurity";
import AboutPress from "../components/about/AboutPress";
import AboutInvestors from "../components/about/AboutInvestors";
import AboutCareers from "../components/about/AboutCareers";
import AboutCommunity from "../components/about/AboutCommunity";
import AboutContact from "../components/about/AboutContact";
import AboutFinalCTA from "../components/about/AboutFinalCTA";
export const metadata = {
  title: "Configgo — About Us",
  description:
    "Learn more about Configgo, our mission, team, and values. Discover how we are transforming real estate CRM solutions.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
        <AboutHero />
        <AboutMission />
        <AboutPillars />    

             <AboutTimeline />
        <AboutTeam />   
        <AboutValues />
        <AboutOffices />
        <AboutSecurity />



        <AboutCareers />
            <AboutCommunity />
        <AboutContact />
        <AboutFinalCTA />

    </main>
  );
}
