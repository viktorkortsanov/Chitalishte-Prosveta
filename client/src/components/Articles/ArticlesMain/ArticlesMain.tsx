import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./ArticlesMain.css";
import { articleService, type Article } from "../../../services/articleService";

type Category = "all" | "news" | "event";

interface NewsPageProps {
    articles?: Article[];
    isAdmin?: boolean;
}

const CATEGORY_LABEL: Record<"news" | "event", string> = {
    news: "Новина",
    event: "Събитие",
};

const PER_PAGE = 6;

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("bg-BG", { day: "numeric", month: "long", year: "numeric" });
}

function excerptOf(text: string) {
    return text.length > 140 ? `${text.slice(0, 140).trimEnd()}…` : text;
}

export default function ArticlesMain({ articles, isAdmin = false }: NewsPageProps) {
    const [filter, setFilter] = useState<Category>("all");
    const [page, setPage] = useState(1);
    const [fetchedArticles, setFetchedArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (articles) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        articleService.getAll()
            .then((data) => { if (!cancelled) setFetchedArticles(data); })
            .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : "Грешка от сървъра."); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [articles]);

    const allArticles = articles ?? fetchedArticles;
    const filtered = allArticles.filter((a) => filter === "all" || a.category === filter);
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    function handleFilter(cat: Category) {
        setFilter(cat);
        setPage(1);
    }

    return (
        <div className="news-page">
            <div className="news-page__inner">
                <div className="news-page__header">
                    <div className="news-page__header-left">
                        <span className="news-page__label">Читалище Просвета</span>
                        <div className="news-page__accent" />
                        <h1 className="news-page__title">Новини & Събития</h1>
                    </div>
                    <div className="news-page__actions">
                        <div className="news-page__filter">
                            {(["all", "news", "event"] as Category[]).map((cat) => (
                                <button
                                    key={cat}
                                    className={`news-page__filter-btn${filter === cat ? " is-active" : ""}`}
                                    onClick={() => handleFilter(cat)}
                                >
                                    {cat === "all" ? "Всички" : CATEGORY_LABEL[cat]}
                                </button>
                            ))}
                        </div>
                        {isAdmin && (
                            <button
                                className="news-page__add-btn"
                                onClick={() => navigate("/novini-i-sabitiya/create")}
                                aria-label="Добави статия"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="news-page__empty">
                        <p>Зареждане...</p>
                    </div>
                ) : error ? (
                    <div className="news-page__empty">
                        <p>{error}</p>
                    </div>
                ) : paginated.length === 0 ? (
                    <div className="news-page__empty">
                        <p>Няма намерени статии.</p>
                    </div>
                ) : (
                    <div className="news-page__grid">
                        {paginated.map((article) => (
                            <article key={article.id} className="news-card">
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
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="news-page__pagination">
                        <button
                            className="news-page__pag-btn"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            aria-label="Предишна страница"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                className={`news-page__pag-btn${page === p ? " is-active" : ""}`}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            className="news-page__pag-btn"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            aria-label="Следваща страница"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}