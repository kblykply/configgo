import Hero from "./components/Hero";
import Partners from "./components/Partners";
import PropertyShowcase from "./components/PropertyShowcase";
import AboutUsSection from "./components/AboutUsSection";
import ImmersiveSection from "./components/ImmersiveSection";
import WeatherCreationSection from "./components/WeatherCreationSection"; 
import WebSolutionsSection from "./components/WebSolutionsSection";
import NewsSection from "./components/NewsSection";
import FaqSection from "./components/FaqSection";
export default function Page() {
  return (
    <main>
      
      <Hero />
      <Partners 
        eyebrow="Our Trusted Partners"
        title="Companies We Collaborate With"
      />
      <PropertyShowcase />
      <AboutUsSection />
      <ImmersiveSection 
        titleLeft="Explore Our"
        titleRight="Immersive Virtual Tours"
        description="Step inside our properties from the comfort of your home. Our immersive virtual tours offer a 360-degree view, allowing you to explore every corner and detail as if you were there in person."
        mediaSrc="/immersive-tour.jpg"
        mediaAlt="Immersive Virtual Tour"
        mediaType="image"
      />
      <WeatherCreationSection 
        decorSrc="/weather-decor.png"
      />
      <WebSolutionsSection />
      <NewsSection />
      <FaqSection />
      
      

    </main>
  );
}
