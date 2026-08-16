import { Link } from "react-router";
import "./HeroSection.css";
import heroImg from "../../../assets/images/prosveta-logo.png";

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="hero__decor" aria-hidden="true">
                <div className="hero__ring hero__ring--1" />
                <div className="hero__ring hero__ring--2" />
                <div className="hero__ring hero__ring--3" />
                <div className="hero__ring hero__ring--4" />
                <div className="hero__dot hero__dot--1" />
                <div className="hero__dot hero__dot--2" />
                <div className="hero__dot hero__dot--3" />
                <div className="hero__dot hero__dot--4" />
                <div className="hero__dot hero__dot--5" />
                <div className="hero__line hero__line--1" />
                <div className="hero__line hero__line--2" />
                <div className="hero__glow hero__glow--1" />
                <div className="hero__glow hero__glow--2" />
            </div>

            <div className="hero__inner">
                <div className="hero__img-wrap">
                    <img src={heroImg} alt="Лого на НЧ Просвета 1870" className="hero__img" />
                </div>

                <div className="hero__divider" />

                <div className="hero__content">
                    <span className="hero__label">От 1870 година</span>
                    <div className="hero__accent" />
                    <h1 className="hero__title">
                        Народно читалище<br />
                        &bdquo;Просвета&ldquo; &mdash; Свиленград
                    </h1>
                    <p className="hero__sub">
                        Пазим традициите, обогатяваме бъдещето. Заповядайте на нашите
                        събития и дейности.
                    </p>
                    <Link to="/novini-i-sabitiya" className="hero__btn">
                        Разгледайте събитията
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}