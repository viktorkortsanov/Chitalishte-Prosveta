import { useState, useRef, useCallback } from "react";
import "./CreateArticle.css";

type Category = "news" | "event";

interface ArticleFormData {
    title: string;
    category: Category;
    image: File | null;
    text: string;
}

interface ArticleFormErrors {
    title?: string;
    image?: string;
    text?: string;
}

interface ArticleFormProps {
    onClose: () => void;
    onSubmit: (data: ArticleFormData) => void;
}

export default function ArticleForm({ onClose, onSubmit }: ArticleFormProps) {
    const [form, setForm] = useState<ArticleFormData>({
        title: "",
        category: "news",
        image: null,
        text: "",
    });
    const [errors, setErrors] = useState<ArticleFormErrors>({});
    const [preview, setPreview] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function validate(): boolean {
        const newErrors: ArticleFormErrors = {};
        if (!form.title.trim()) newErrors.title = "Заглавието е задължително.";
        if (!form.image) newErrors.image = "Моля изберете изображение.";
        if (!form.text.trim()) newErrors.text = "Текстът е задължителен.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function handleCategory(category: Category) {
        setForm((prev) => ({ ...prev, category }));
    }

    function handleFile(file: File) {
        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, image: "Файлът трябва да е изображение." }));
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, image: "Файлът не трябва да надвишава 5MB." }));
            return;
        }
        setForm((prev) => ({ ...prev, image: file }));
        setErrors((prev) => ({ ...prev, image: undefined }));
        setPreview(URL.createObjectURL(file));
    }

    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    }, []);

    function removeImage() {
        setForm((prev) => ({ ...prev, image: null }));
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(form);
    }

    return (
        <div className="article-form-wrap">
            <div className="article-form-card">
                <div className="article-form__accent" />

                <div className="article-form__header">
                    <div>
                        <h2 className="article-form__title">Нова статия</h2>
                        <p className="article-form__sub">Попълнете полетата, за да публикувате статия.</p>
                    </div>
                    <button className="article-form__close" onClick={onClose} aria-label="Затвори">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form className="article-form__body" onSubmit={handleSubmit} noValidate method="POST">
                    <div className="article-field">
                        <label htmlFor="af-title" className="article-field__label">Заглавие</label>
                        <input
                            id="af-title"
                            name="title"
                            type="text"
                            className={`article-field__input${errors.title ? " is-error" : ""}`}
                            placeholder="Въведете заглавие на статията"
                            value={form.title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="article-field__error">{errors.title}</span>}
                    </div>

                    <div className="article-field">
                        <span className="article-field__label">Категория</span>
                        <div className="article-category">
                            <button
                                type="button"
                                className={`article-category__btn${form.category === "news" ? " is-active" : ""}`}
                                onClick={() => handleCategory("news")}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                    <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
                                </svg>
                                Новина
                            </button>
                            <button
                                type="button"
                                className={`article-category__btn${form.category === "event" ? " is-active" : ""}`}
                                onClick={() => handleCategory("event")}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Събитие
                            </button>
                        </div>
                    </div>

                    <div className="article-field">
                        <span className="article-field__label">Изображение</span>
                        {!preview ? (
                            <div
                                className={`article-upload${dragging ? " is-dragging" : ""}${errors.image ? " is-error" : ""}`}
                                onClick={() => inputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                role="button"
                                tabIndex={0}
                                aria-label="Качи изображение"
                            >
                                <div className="article-upload__icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <span className="article-upload__text">Кликнете или провлачете файл тук</span>
                                <span className="article-upload__hint">PNG, JPG, WEBP — макс. 5MB</span>
                            </div>
                        ) : (
                            <div className="article-preview">
                                <img src={preview} alt="Preview" className="article-preview__img" />
                                <button type="button" className="article-preview__remove" onClick={removeImage} aria-label="Премахни изображение">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="article-upload__input"
                            onChange={handleFileInput}
                        />
                        {errors.image && <span className="article-field__error">{errors.image}</span>}
                    </div>

                    <div className="article-field">
                        <label htmlFor="af-text" className="article-field__label">Текст</label>
                        <textarea
                            id="af-text"
                            name="text"
                            className={`article-field__textarea${errors.text ? " is-error" : ""}`}
                            placeholder="Напишете текста на статията..."
                            value={form.text}
                            onChange={handleChange}
                        />
                        {errors.text && <span className="article-field__error">{errors.text}</span>}
                    </div>

                    <div className="article-form__footer">
                        <button type="submit" className="article-form__submit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 2L11 13" />
                                <path d="M22 2L15 22 11 13 2 9l20-7z" />
                            </svg>
                            Публикувай
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}