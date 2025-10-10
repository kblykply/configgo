import Hero from "./components/Hero";
import Partners from "./components/Partners";
import PropertyShowcase from "./components/PropertyShowcase";
import AboutUsSection from "./components/AboutUsSection";
import ImmersiveSection from "./components/ImmersiveSection";
import WeatherCreationSection from "./components/WeatherCreationSection"; 
import WebSolutionsSection from "./components/WebSolutionsSection";
import NewsSection from "./components/NewsSection";
import FaqSection from "./components/FaqSection";
import CRMBasedDigitalTwinSection from "./components/CRMBasedDigitalTwinSection";
import ConfiggoCRMPlusSection from "./components/ConfiggoCRMPlusSection";
export default function Page() {
  return (
    <main>
      
      <Hero />
      <Partners 
      />
      <PropertyShowcase />
            <CRMBasedDigitalTwinSection />
                        <ConfiggoCRMPlusSection />


     
      <WeatherCreationSection 
      />
      <WebSolutionsSection />
      <NewsSection />
      <FaqSection />
      
      

    </main>
  );
}
