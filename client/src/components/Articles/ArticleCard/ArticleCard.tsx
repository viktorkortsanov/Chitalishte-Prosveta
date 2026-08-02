import { Link } from "react-router";
import "./ArticleCard.css";
import type { Article } from "../../../services/articleService";
import { CATEGORY_LABEL, formatDate, excerptOf } from "../../../utils/article";

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="news-card">
            <div className="news-card__img-wrap">
                {article.imageUrl ? (
                    <img src={article.imageUrl} alt={article.title} className="news-card__img" />
                ) : (
                    <div className="news-card__img-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                    </div>
                )}
                <span className={`news-card__badge news-card__badge--${article.category}`}>
                    {CATEGORY_LABEL[article.category]}
                </span>
            </div>
            <div className="news-card__body">
                <span className="news-card__date">{formatDate(article.createdAd)}</span>
                <h3 className="news-card__title">{article.title}</h3>
                <p className="news-card__excerpt">{excerptOf(article.text)}</p>
                <Link to={`/novini-i-sabitiya/${article.id}`} className="news-card__link">
                    Прочети повече
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
