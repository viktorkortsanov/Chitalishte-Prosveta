import AboutUsSection from "./AboutUsSection/AboutUsSection";
import ActivitySection from "./ActivitySection/ActivitySection";
import HeroSection from "./HeroSection/HeroSection";
import NewsSection from "./NewsSection/NewsSection";

export default function MainContent() {
    return (
        <main>
            <HeroSection />
            <AboutUsSection />
            <NewsSection />
            <ActivitySection />
        </main>
    )
}