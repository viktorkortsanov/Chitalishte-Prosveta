import { Link } from "react-router";
import "./Footer.css";
import logoSrc from "../../assets/images/prosveta-logo.png"

const NAV_LINKS = [
    { label: "Начало", href: "/" },
    { label: "За нас", href: "/za-nas" },
    { label: "Новини", href: "/novini" },
    { label: "Дейности", href: "/deynosti" },
    { label: "Галерия", href: "/galeriya" },
    { label: "Контакти", href: "/kontakti" },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">

                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        <div className="footer__logo-img-wrap">
                            <img
                                src={logoSrc}
                                alt="Лого НЧ Просвета 1870"
                                className="footer__logo-img"
                            />
                        </div>
                        <div className="footer__logo-text">
                            <span className="footer__logo-title">НЧ „Просвета — 1870"</span>
                            <span className="footer__logo-sub">Свиленград</span>
                        </div>
                    </Link>
                    <p className="footer__desc">
                        Пазим традициите, обогатяваме бъдещето. Читалището е културното
                        сърце на Свиленград от 1870 година.
                    </p>
                    <div className="footer__contacts">
                        <div className="footer__contact">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Център, бул. „България“ 71, 6500 Свиленград
                        </div>
                        <div className="footer__contact">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            088 523 9636
                        </div>
                        <div className="footer__contact">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            1870nchprosveta@gmail.com
                        </div>
                    </div>
                </div>

                <div className="footer__col">
                    <h3 className="footer__col-title">Навигация</h3>
                    <nav className="footer__links">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} to={link.href} className="footer__link">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="footer__col">
                    <h3 className="footer__col-title">Последвайте ни</h3>
                    <div className="footer__social">
                        <a
                            href="https://www.facebook.com/schitalishte.prosveta"
                            className="footer__social-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <div className="footer__social-icon footer__social-icon--fb">
                                <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </div>
                            <div className="footer__social-info">
                                <span className="footer__social-name">Facebook</span>
                                <span className="footer__social-handle">Читалище Просвета Свиленград </span>
                            </div>
                        </a>
                        <a
                            href="https://www.youtube.com/@%D0%9D%D0%A7%D0%9F%D0%A0%D0%9E%D0%A1%D0%92%D0%95%D0%A2%D0%901870%D0%A1%D0%92%D0%98%D0%9B%D0%95%D0%9D%D0%93%D0%A0%D0%90%D0%94"
                            className="footer__social-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                        >
                            <div className="footer__social-icon footer__social-icon--yt">
                                <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000" />
                                </svg>
                            </div>
                            <div className="footer__social-info">
                                <span className="footer__social-name">YouTube</span>
                                <span className="footer__social-handle">НЧ ПРОСВЕТА 1870 СВИЛЕНГРАД</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <span className="footer__copy">
                    © 2025 НЧ „Просвета — 1870" Свиленград. Всички права запазени.
                </span>
                <span className="footer__copy">
                    Направено с <span className="footer__heart">♥</span> за читалището
                </span>
            </div>
        </footer>
    );
}