import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { authService } from "../../services/authService";
import "./AuthForms.css";

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginErrors {
    email?: string;
    password?: string;
}

export default function LoginForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
    const [errors, setErrors] = useState<LoginErrors>({});
    const [serverError, setServerError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function validate(): boolean {
        const newErrors: LoginErrors = {};
        if (!form.email) newErrors.email = "Имейлът е задължителен.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Невалиден имейл адрес.";
        if (!form.password) newErrors.password = "Паролата е задължителна.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setServerError("");
        if (!validate()) return;

        setSubmitting(true);
        try {
            await authService.login(form);
            navigate("/");
        } catch (err) {
            setServerError(err instanceof Error ? err.message : "Грешка от сървъра.");
        } finally {
            setSubmitting(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    return (
        <div className="auth-card">
            <div className="auth-card__accent" />
            <h1 className="auth-card__title">Добре дошли</h1>
            <p className="auth-card__sub">Влезте в своя акаунт</p>

            <form onSubmit={handleSubmit} noValidate method="POST">
                <div className="auth-field">
                    <label htmlFor="login-email" className="auth-field__label">
                        Имейл адрес
                    </label>
                    <input
                        id="login-email"
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
                    <div className="auth-field__row">
                        <label htmlFor="login-password" className="auth-field__label">
                            Парола
                        </label>
                    </div>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        className={`auth-field__input${errors.password ? " is-error" : ""}`}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    {errors.password && (
                        <span className="auth-field__error">{errors.password}</span>
                    )}
                </div>

                {serverError && <p className="auth-form__error">{serverError}</p>}

                <button type="submit" className="auth-btn" disabled={submitting}>
                    {submitting ? "Влизане..." : "Вход"}
                </button>
            </form>

            <div className="auth-divider"><span>или</span></div>
            <p className="auth-link-row">
                Нямате акаунт?{" "}
                <Link to="/register" className="auth-link">
                    Регистрирайте се
                </Link>
            </p>
        </div>
    );
}