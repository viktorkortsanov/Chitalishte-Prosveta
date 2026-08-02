import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import "./ArticlesMain.css";
import { articleService, type Article } from "../../../services/articleService";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";

type Category = "all" | "news" | "event";

interface NewsPageProps {
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

export default function ArticlesMain({ isAdmin = false }: NewsPageProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const categoryParam = searchParams.get("category");
    const filter: Category = categoryParam === "news" || categoryParam === "event" ? categoryParam : "all";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const searchQuery = searchParams.get("search") ?? "";

    const [searchInput, setSearchInput] = useState(searchQuery);
    const debouncedSearch = useDebouncedValue(searchInput, 400);

    const [articles, setArticles] = useState<Article[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const current = searchParams.get("search") ?? "";
        if (debouncedSearch === current) return;

        const next = new URLSearchParams(searchParams);
        if (debouncedSearch) next.set("search", debouncedSearch); else next.delete("search");
        next.set("page", "1");
        setSearchParams(next, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        articleService.getAll({
            category: filter === "all" ? undefined : filter,
            search: searchQuery || undefined,
            page,
            limit: PER_PAGE,
        })
            .then((data) => { if (!cancelled) { setArticles(data.articles); setTotal(data.total); } })
            .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : "Грешка от сървъра."); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [filter, page, searchQuery]);

    const totalPages = Math.ceil(total / PER_PAGE);

    function handleFilter(cat: Category) {
        const next = new URLSearchParams(searchParams);
        if (cat === "all") next.delete("category"); else next.set("category", cat);
        next.set("page", "1");
        setSearchParams(next);
    }

    function setPage(p: number) {
        const next = new URLSearchParams(searchParams);
        next.set("page", String(p));
        setSearchParams(next);
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
                        <div className="news-page__search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                className="news-page__search-input"
                                placeholder="Търсене по заглавие..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                aria-label="Търсене по заглавие"
                            />
                        </div>
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
                ) : articles.length === 0 ? (
                    <div className="news-page__empty">
                        <p>{filter !== "all" || searchQuery ? "Няма намерени статии за избраните критерии." : "Няма намерени статии."}</p>
                    </div>
                ) : (
                    <div className="news-page__grid">
                        {articles.map((article) => (
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
                            onClick={() => setPage(Math.max(1, page - 1))}
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
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
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
