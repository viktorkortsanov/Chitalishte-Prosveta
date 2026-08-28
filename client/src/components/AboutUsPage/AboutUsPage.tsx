import "./AboutUsPage.css";
import popmarkovImg from "../../assets/images/popmarkov.jpg";
import { TIMELINE } from "../../data/timeline";
import { LEADERSHIP } from "../../data/leadership";

export default function AboutUsPage() {
    return (
        <div className="about-page">
            <div className="about-page__inner">

                <section className="about-page__hero">
                    <div className="about-page__hero-text">
                        <span className="about-page__label">За нас</span>
                        <div className="about-page__accent" />
                        <h1 className="about-page__hero-title">
                            Читалище &bdquo;Просвета&ldquo; &mdash;<br />над 150 години история
                        </h1>
                        <p className="about-page__hero-body">
                            Едно от първите читалища в страната, създадено на 01.03.1870г. по инициатива на главния учител Христо Попмарков и родолюбиви свиленградчани. Пазим традициите, обогатяваме бъдещето.
                        </p>
                        <p className="about-page__hero-body">
                            Читалище &bdquo;Звезда&ldquo; в Свиленград е едно от първите в страната, възникнало непосредствено след тези в Лом, Свищов, Шумен и други градове. Това важно за града ни културно събитие е отразено в дописка на вестник &bdquo;Македония&ldquo; от 17.03.1870г.
                        </p>
                    </div>
                    <div className="about-page__hero-img-wrap">
                        <img
                            src={popmarkovImg}
                            alt="Христо Попмарков - основател на читалището"
                            className="about-page__hero-img"
                        />
                        <span className="about-page__hero-caption">
                            Христо Попмарков &mdash; основател на читалището
                        </span>
                    </div>
                </section>

                <section className="about-page__timeline">
                    <div className="about-page__section-header">
                        <span className="about-page__label about-page__label--center">Хронология</span>
                        <div className="about-page__accent about-page__accent--center" />
                        <h2 className="about-page__section-title">Ключови моменти</h2>
                    </div>

                    {/* Desktop timeline */}
                    <div className="about-page__tl">
                        {TIMELINE.map((item, i) => {
                            const isLast = i === TIMELINE.length - 1;

                            const leftContent = item.side === "left"
                                ? (
                                    <>
                                        <span className="about-page__tl-year">{item.year}</span>
                                        <h3 className="about-page__tl-title">{item.title}</h3>
                                        <p className="about-page__tl-text">{item.text}</p>
                                    </>
                                )
                                : item.image?.position === "left"
                                    ? (
                                        <div className="about-page__tl-img-wrap">
                                            <img src={item.image.src} alt={item.image.alt} className="about-page__tl-img" />
                                        </div>
                                    )
                                    : null;

                            const rightContent = item.side === "right"
                                ? (
                                    <>
                                        <span className="about-page__tl-year">{item.year}</span>
                                        <h3 className="about-page__tl-title">{item.title}</h3>
                                        <p className="about-page__tl-text">{item.text}</p>
                                    </>
                                )
                                : item.image?.position === "right"
                                    ? (
                                        <div className="about-page__tl-img-wrap">
                                            <img src={item.image.src} alt={item.image.alt} className="about-page__tl-img" />
                                        </div>
                                    )
                                    : null;

                            return (
                                <div key={i} className="about-page__tl-item">
                                    <div className={`about-page__tl-content about-page__tl-content--left${!leftContent ? " about-page__tl-content--empty" : ""}`}>
                                        {leftContent}
                                    </div>
                                    <div className="about-page__tl-center">
                                        <div className="about-page__tl-dot" />
                                        {!isLast && <div className="about-page__tl-line" />}
                                    </div>
                                    <div className={`about-page__tl-content about-page__tl-content--right${!rightContent ? " about-page__tl-content--empty" : ""}`}>
                                        {rightContent}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile timeline */}
                    <div className="about-page__tl-mobile">
                        {TIMELINE.map((item, i) => {
                            const isLast = i === TIMELINE.length - 1;
                            const isOdd = i % 2 === 0;
                            return (
                                <div key={i} className="about-page__tl-mobile-item">
                                    <div className="about-page__tl-mobile-center">
                                        <div className="about-page__tl-mobile-dot" />
                                        {!isLast && <div className="about-page__tl-mobile-line" />}
                                    </div>
                                    <div className={`about-page__tl-mobile-body about-page__tl-mobile-body--${isOdd ? "odd" : "even"}`}>
                                        <span className="about-page__tl-year">{item.year}</span>
                                        <h3 className="about-page__tl-title">{item.title}</h3>
                                        <p className="about-page__tl-text">{item.text}</p>
                                        {item.image && (
                                            <img
                                                src={item.image.src}
                                                alt={item.image.alt}
                                                className="about-page__tl-mobile-img"
                                                style={{ alignSelf: isOdd ? "flex-start" : "flex-end" }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="about-page__quote">
                    <blockquote className="about-page__blockquote">
                        &bdquo;Светло и просторно помещение, украсено със слънце, пръскащо лъчи на всички страни, приютило голям шкаф с най-разнообразни книги...&ldquo;
                    </blockquote>
                    <cite className="about-page__cite">&mdash; Бачо Киро, 1872</cite>
                </section>

                <section className="about-page__leadership">
                    <div className="about-page__section-header">
                        <span className="about-page__label about-page__label--center">Ръководство</span>
                        <div className="about-page__accent about-page__accent--center" />
                        <h2 className="about-page__section-title">Нашият екип</h2>
                    </div>

                    <div className="about-page__lead-grid">
                        {LEADERSHIP.map((person, i) => (
                            <div key={i} className="about-page__lead-card">
                                <div className="about-page__lead-photo">
                                    <img src={person.photo} alt={person.name} className="about-page__lead-photo-img" />
                                </div>
                                <div className="about-page__lead-info">
                                    <span className="about-page__lead-name">{person.name}</span>
                                    <span className="about-page__lead-role">{person.role}</span>
                                    <a href={`mailto:${person.email}`} className="about-page__lead-email">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                        <span>{person.email}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}