import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { authService } from "../../services/authService";
import "./AuthForms.css";

type Status = "loading" | "success" | "error";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<Status>("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus("error");
            setMessage("Липсва токен за потвърждение.");
            return;
        }

        authService
            .verifyEmail(token)
            .then((res) => {
                setStatus("success");
                setMessage(res.message);
            })
            .catch((err) => {
                setStatus("error");
                setMessage(err instanceof Error ? err.message : "Грешка от сървъра.");
            });
    }, [searchParams]);

    return (
        <div className="auth-card">
            <div className="auth-card__accent" />
            <h1 className="auth-card__title">Потвърждение на имейл</h1>

            {status === "loading" && <p className="auth-card__sub">Потвърждаване...</p>}

            {status === "success" && (
                <>
                    <p className="auth-card__sub">{message}</p>
                    <p className="auth-link-row">
                        <a href="/login" className="auth-link">
                            Към вход
                        </a>
                    </p>
                </>
            )}

            {status === "error" && <p className="auth-form__error">{message}</p>}
        </div>
    );
}
