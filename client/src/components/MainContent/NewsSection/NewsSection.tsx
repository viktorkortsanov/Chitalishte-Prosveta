import { Link } from "react-router";
import { useEffect, useState } from "react";
import "./NewsSection.css";
import { articleService, type Article } from "../../../services/articleService";
import ArticleCard from "../../Articles/ArticleCard/ArticleCard";

export default function NewsSection() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        let cancelled = false;
        articleService.getAll({ limit: 3 })
            .then((data) => { if (!cancelled) setArticles(data.articles); })
            .catch((err) => { console.error(err); });

        return () => { cancelled = true; };
    }, []);

    if (articles.length === 0) return null;

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
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
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
