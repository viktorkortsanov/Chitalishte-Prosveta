import "./AboutUsSection.css";
import imgSrc from "../../../assets/images/about-us-section.jpg"

export default function AboutUsSection() {
    return (
        <section className="about">
            <div className="about__inner">
                <div className="about__text">
                    <span className="about__label">За нас</span>
                    <div className="about__accent" />
                    <h2 className="about__title">
                        Народно читалище<br />
                        „Просвета — <span>1870</span>"
                    </h2>
                    <p className="about__body">
                        В своята над 150-годишна история читалището успява да поддържа и
                        до днес възрожденския си дух. Постиженията на нашите възпитаници
                        са художествен барометър на творческия ни живот и свидетелство за
                        неугасващата любов към културата и изкуството.
                    </p>
                    <a href="/za-nas" className="about__btn">
                        Научи още
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <div className="about__image-wrap">
                    <img
                        src={imgSrc}
                        alt="Народно читалище Просвета — Свиленград"
                        className="about__image"
                    />
                </div>
            </div>
        </section>
    );
}