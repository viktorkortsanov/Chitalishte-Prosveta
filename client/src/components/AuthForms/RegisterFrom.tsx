import { useState } from "react";
import "./AuthForms.css";

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function RegisterForm() {
    const [form, setForm] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<RegisterErrors>({});

    function validate(): boolean {
        const newErrors: RegisterErrors = {};
        if (!form.username) newErrors.username = "Потребителското име е задължително.";
        else if (form.username.length < 3)
            newErrors.username = "Минимум 3 символа.";

        if (!form.email) newErrors.email = "Имейлът е задължителен.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Невалиден имейл адрес.";

        if (!form.password) newErrors.password = "Паролата е задължителна.";
        else if (form.password.length < 8)
            newErrors.password = "Паролата трябва да е минимум 8 символа.";

        if (!form.confirmPassword)
            newErrors.confirmPassword = "Потвърдете паролата.";
        else if (form.password !== form.confirmPassword)
            newErrors.confirmPassword = "Паролите не съвпадат.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        console.log("Register:", form);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    return (
        <div className="auth-card">
            <div className="auth-card__accent" />
            <h1 className="auth-card__title">Създайте акаунт</h1>
            <p className="auth-card__sub">
                Присъединете се към читалище „Просвета"
            </p>

            <form onSubmit={handleSubmit} noValidate>
                <div className="auth-field">
                    <label htmlFor="reg-username" className="auth-field__label">
                        Потребителско име
                    </label>
                    <input
                        id="reg-username"
                        name="username"
                        type="text"
                        className={`auth-field__input${errors.username ? " is-error" : ""}`}
                        placeholder="ivan_petrov"
                        value={form.username}
                        onChange={handleChange}
                        autoComplete="username"
                    />
                    {errors.username && (
                        <span className="auth-field__error">{errors.username}</span>
                    )}
                </div>

                <div className="auth-field">
                    <label htmlFor="reg-email" className="auth-field__label">
                        Имейл адрес
                    </label>
                    <input
                        id="reg-email"
                        name="email"
                        type="email"
                        className={`auth-field__input${errors.email ? " is-error" : ""}`}
                        placeholder="example@mail.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                    {errors.email && (
                        <span className="auth-field__error">{errors.email}</span>
                    )}
                </div>

                <div className="auth-field">
                    <label htmlFor="reg-password" className="auth-field__label">
                        Парола
                    </label>
                    <input
                        id="reg-password"
                        name="password"
                        type="password"
                        className={`auth-field__input${errors.password ? " is-error" : ""}`}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    {errors.password ? (
                        <span className="auth-field__error">{errors.password}</span>
                    ) : (
                        <span className="auth-field__hint">Минимум 8 символа</span>
                    )}
                </div>

                <div className="auth-field">
                    <label htmlFor="reg-confirm" className="auth-field__label">
                        Потвърждаване на парола
                    </label>
                    <input
                        id="reg-confirm"
                        name="rePassword"
                        type="password"
                        className={`auth-field__input${errors.confirmPassword ? " is-error" : ""}`}
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                        <span className="auth-field__error">{errors.confirmPassword}</span>
                    )}
                </div>

                <button type="submit" className="auth-btn">
                    Регистрация
                </button>
            </form>

            <div className="auth-divider"><span>или</span></div>
            <p className="auth-link-row">
                Вече имате акаунт?{" "}
                <a href="/login" className="auth-link">
                    Влезте
                </a>
            </p>
        </div>
    );
}