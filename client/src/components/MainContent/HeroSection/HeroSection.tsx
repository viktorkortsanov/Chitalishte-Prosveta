import "./HeroSection.css";

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="hero__bg" />
            <div className="hero__content">
                <span className="hero__label">От 1870 година</span>
                <h1 className="hero__title">
                    Народно читалище „Просвета" — Свиленград
                </h1>
                <p className="hero__sub">
                    Пазим традициите, обогатяваме бъдещето. Заповядайте на нашите
                    събития и дейности.
                </p>
                <a href="/deynosti" className="hero__btn">
                    Разгледайте събитията
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
            <div className="hero__accent" />
        </section>
    );
}