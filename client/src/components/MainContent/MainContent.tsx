import AboutUsSection from "./AboutUsSection/AboutUsSection";
import HeroSection from "./HeroSection/HeroSection";
import NewsSection from "./NewsSection/NewsSection";

export default function MainContent() {
    return (
        <main>
            <HeroSection />
            <AboutUsSection />
            <NewsSection />
        </main>
    )
}