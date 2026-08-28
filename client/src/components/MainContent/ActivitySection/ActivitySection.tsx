import "./ActivitySection.css";
import { Link } from "react-router";
import { ACTIVITY_PHOTOS as PHOTOS } from "../../../data/activityPhotos";

export default function ActivitySection() {
    return (
        <section className="activity">
            <div className="activity__inner">
                <div className="activity__header">
                    <span className="activity__label">Дейности</span>
                    <div className="activity__accent" />
                    <h2 className="activity__title">Нашите състави</h2>
                    <p className="activity__sub">
                        Народно читалище „Просвета — 1870" е дом на множество творчески
                        състави. Танцови, певчески и театрални групи, обединени от любовта
                        към изкуството и традициите.
                    </p>
                </div>

                <div className="activity__photos">
                    {PHOTOS.map((src, i) => (
                        <div key={i} className="activity__photo-wrap">
                            <img
                                src={src}
                                alt={`Състав ${i + 1}`}
                                className="activity__photo"
                            />
                        </div>
                    ))}
                </div>

                <div className="activity__footer">
                    <Link to="/deynosti" className="activity__btn">
                        Разгледайте съставите
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}