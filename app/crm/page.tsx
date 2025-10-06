// app/configgo/page.tsx
import ConfiggoHero from "../components/crm/ConfiggoHero";
import ConfiggoSocialProof from "../components/crm/ConfiggoSocialProof";
import ConfiggoPersonas from "../components/crm/ConfiggoPersonas";
import ConfiggoOverview from "../components/crm/ConfiggoOverview";
import ConfiggoLeadCapture from "../components/crm/ConfiggoLeadCapture";
import ConfiggoPipelines from "../components/crm/ConfiggoPipelines";
import ConfiggoInventory from "../components/crm/ConfiggoInventory";
import ConfiggoCommsHub from "../components/crm/ConfiggoCommsHub";
import ConfiggoMarketing from "../components/crm/ConfiggoMarketing";
import ConfiggoDocuments from "../components/crm/ConfiggoDocuments";
import ConfiggoReporting from "../components/crm/ConfiggoReporting";
import ConfiggoTeams from "../components/crm/ConfiggoTeams";
import ConfiggoIntegrations from "../components/crm/ConfiggoIntegrations";
import ConfiggoTwinAddon from "../components/crm/ConfiggoTwinAddon";
import ConfiggoImplementation from "../components/crm/ConfiggoImplementation";
import ConfiggoSecurity from "../components/crm/ConfiggoSecurity";
import ConfiggoPricing from "../components/crm/ConfiggoPricing";
import ConfiggoFAQ from "../components/crm/ConfiggoFAQ";
import ConfiggoFinalCTA from "../components/crm/ConfiggoFinalCTA";

export const metadata = {
  title: "Configgo CRM — Real Estate CRM System",
  description:
    "One CRM for leads, inventory, pipelines, omnichannel communication and reporting — built for real estate teams.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
      <ConfiggoHero />
        <ConfiggoSocialProof />
        <ConfiggoPersonas />
        <ConfiggoOverview />
        <ConfiggoLeadCapture /> 
        <ConfiggoPipelines />
        <ConfiggoInventory />
        <ConfiggoCommsHub />
        <ConfiggoMarketing />
        <ConfiggoDocuments />
        <ConfiggoReporting />
        <ConfiggoTeams />
       
        <ConfiggoIntegrations />
        <ConfiggoTwinAddon /> 

        
          
        <ConfiggoImplementation />
        <ConfiggoSecurity />
        <ConfiggoPricing />
    <ConfiggoFAQ />
     <ConfiggoFinalCTA />


     
    </main>
  );
}
