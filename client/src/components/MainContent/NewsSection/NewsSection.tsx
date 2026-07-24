import { Link } from "react-router";
import "./NewsSection.css";

interface NewsItem {
    id: number;
    date: string;
    title: string;
    excerpt: string;
    slug: string;
    image?: string;
}

const PLACEHOLDER_NEWS: NewsItem[] = [
    { id: 1, date: "15 юни 2025", title: "Заглавие на новината", excerpt: "Кратко описание на новината. Тук ще се показва автоматично извлеченият текст от базата данни.", slug: "#" },
    { id: 2, date: "10 юни 2025", title: "Заглавие на новината", excerpt: "Кратко описание на новината. Тук ще се показва автоматично извлеченият текст от базата данни.", slug: "#" },
    { id: 3, date: "5 юни 2025", title: "Заглавие на новината", excerpt: "Кратко описание на новината. Тук ще се показва автоматично извлеченият текст от базата данни.", slug: "#" },
];

interface NewsSectionProps {
    news?: NewsItem[];
}

export default function NewsSection({ news = PLACEHOLDER_NEWS }: NewsSectionProps) {
    return (
        <section className="news">
            <div className="news__header">
                <span className="news__label">Новини</span>
                <div className="news__accent" />
                <h2 className="news__title">Последни новини</h2>
                <p className="news__sub">
                    Следете актуалните събития и новини от живота на читалището.
                </p>
            </div>

            <div className="news__grid">
                {news.map((item) => (
                    <article key={item.id} className="news-card">
                        <div className="news-card__img-wrap">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="news-card__img" />
                            ) : (
                                <div className="news-card__img-placeholder">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="M21 15l-5-5L5 21" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="news-card__body">
                            <span className="news-card__date">{item.date}</span>
                            <h3 className="news-card__title">{item.title}</h3>
                            <p className="news-card__excerpt">{item.excerpt}</p>
                            <a href={`/novini/${item.slug}`} className="news-card__link">
                                Прочети повече
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            <div className="news__footer">
                <Link to="/novini-i-sabitiya" className="news__btn">
                    Всички новини
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}