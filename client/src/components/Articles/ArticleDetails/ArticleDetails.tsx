import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import "./ArticleDetails.css";
import { articleService, type Article } from "../../../services/articleService";
import { useAuth } from "../../../hooks/useAuth";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";

const CATEGORY_LABEL: Record<"news" | "event", string> = {
    news: "Новина",
    event: "Събитие",
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("bg-BG", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticleDetails() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if (!slug) return;

        let cancelled = false;
        setLoading(true);
        setError(null);
        articleService.getOne(slug)
            .then((data) => { if (!cancelled) setArticle(data); })
            .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : "Грешка от сървъра."); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [slug]);

    async function handleDelete() {
        if (!article) return;
        setConfirmOpen(false);
        await articleService.delete(article.id);
        navigate("/novini-i-sabitiya");
    }

    if (loading) {
        return (
            <div className="article-details">
                <div className="article-details__inner">
                    <p>Зареждане...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="article-details">
                <div className="article-details__inner">
                    <p>{error ?? "Статията не е намерена."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="article-details">
            <div className="article-details__inner">
                <Link to="/novini-i-sabitiya" className="article-details__back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Обратно към новини & събития
                </Link>

                <article className="article-details__card">
                    <div className="article-details__accent" />

                    {article.imageUrl ? (
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="article-details__img"
                        />
                    ) : (
                        <div className="article-details__img-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </div>
                    )}

                    <div className="article-details__body">
                        <div className="article-details__meta">
                            <span className={`article-details__badge article-details__badge--${article.category}`}>
                                {CATEGORY_LABEL[article.category]}
                            </span>
                            <span className="article-details__date">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {formatDate(article.createdAd)}
                            </span>
                        </div>

                        <h1 className="article-details__title">{article.title}</h1>
                        <div className="article-details__divider" />
                        <div className="article-details__text">
                            {article.text.split("\n").map((paragraph, i) => (
                                paragraph.trim() ? <p key={i}>{paragraph}</p> : null
                            ))}
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="article-details__admin-bar">
                            <button
                                className="article-details__btn-edit"
                                onClick={() => navigate(`/novini-i-sabitiya/${article.id}/edit`)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Редактирай
                            </button>
                            <button className="article-details__btn-delete" onClick={() => setConfirmOpen(true)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                                Изтрий
                            </button>
                        </div>
                    )}
                </article>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title="Изтриване на статия"
                message={`Сигурни ли сте, че искате да изтриете „${article.title}"? Това действие не може да бъде отменено.`}
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
}
