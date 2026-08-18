import "./AboutUsPage.css";
import popmarkovImg from "../../assets/images/popmarkov.jpg";
import galleryOldBuildingImg from "../../assets/images/030s.jpg";
import galleryProsvetaImg from "../../assets/images/423.jpg";
import galleryEventImg from "../../assets/images/1559388_797812840281793_8648069332194572911_o.jpg";
import sustaviImg from "../../assets/images/sustavi.jpg";
import zvezdaImg from "../../assets/images/zvezda.jpg";
import bachoKiro from "../../assets/images/bacho-kiro.jpg";
import team1 from "../../assets/images/vasil.jpg"
import team3 from "../../assets/images/viktor.jpg"

const TIMELINE = [
    {
        year: "1870",
        title: "Основаване",
        text: `Читалище "Звезда" е основано на 01.03.1870г. по инициатива на главния учител Христо Попмарков. Помещението е в най-голямата стая на училището при черквата "Св. Троица".`,
        side: "left",
        image: { src: zvezdaImg, alt: "Старата сграда на читалището", position: "right" },
    },
    {
        year: "1872",
        title: "Бачо Киро посещава читалището",
        text: `Революционерът и книжовник Бачо Киро посещава читалището и остава с отлични впечатления. Иван Вазов е сред членовете на настоятелството.`,
        side: "right",
        image: { src: bachoKiro, alt: "Бачо Киро", position: "left" },
    },
    {
        year: "1875",
        title: "Първа театрална постановка",
        text: `За първи път се представя пиесата "Многострадалната Геновева" пред турски управници, оставили дар на читалището.`,
        side: "right",
        image: { src: galleryOldBuildingImg, alt: "Старата сграда на читалището", position: "left" },
    },
    {
        year: "1914",
        title: `Ново начало - "Просвета"`,
        text: `Читалището възкръсва под името "Просвета". На централното място в града се издига нова сграда от волни пожертвования на гражданите.`,
        side: "left",
        image: { src: galleryProsvetaImg, alt: "Сградата на читалище Просвета", position: "right" },
    },
    {
        year: "1961",
        title: "Нова сграда",
        text: `Читалище "Просвета" пренася дейността си в нова сграда, в която съществува и до днес.`,
        side: "right",
        image: { src: galleryEventImg, alt: "Новата сграда", position: "left" },
    },
    {
        year: "Днес",
        title: "Живо и активно",
        text: `Танцови, певчески и театрални групи продължават да пазят възрожденския дух на читалището.`,
        side: "left",
        image: { src: sustaviImg, alt: "Съставите на читалището", position: "right" },
    },
];

const LEADERSHIP = [
    {
        name: "Васил Василев",
        role: "Председател",
        email: "vasko_kl@abv.bg",
        photo: team1
    },
    {
        name: "Петра Беева",
        role: "Секретар",
        email: "polihronos@mail.bg",
        photo: "",
    },
    {
        name: "Виктор Корцанов",
        role: "IT Специалист",
        email: "viktorkortsanov@gmail.com",
        photo: team3,
    },
];

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