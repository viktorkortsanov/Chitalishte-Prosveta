import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { authService, type AuthUser } from "../../services/authService";
import "./NavBar.css";
import logoSrc from "../../assets/images/prosveta-logo.png";

const NAV_LINKS = [
    { label: "Начало", href: "/" },
    { label: "За нас", href: "/za-nas" },
    { label: "Новини", href: "/novini" },
    { label: "Дейности", href: "/deynosti" },
    { label: "Галерия", href: "/galeriya" },
    { label: "Контакти", href: "/kontakti" },
];

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        authService
            .getCurrentUser()
            .then(({ user }) => setUser(user))
            .catch(() => setUser(null));
    }, [location.pathname]);

    async function handleLogout() {
        setDropdownOpen(false);
        try {
            await authService.logout();
        } finally {
            setUser(null);
            navigate("/");
        }
    }

    return (
        <header className="navbar">
            <div className="navbar__accent" />
            <div className="navbar__inner">

                <a href="/" className="navbar__logo" aria-label="Начална страница">
                    <div className="navbar__logo-img-wrap">
                        <img
                            src={logoSrc}
                            alt="Лого на НЧ Просвета 1870"
                            className="navbar__logo-img"
                        />
                    </div>
                    <div className="navbar__logo-text">
                        <span className="navbar__logo-title">НЧ „Просвета — 1870"</span>
                        <span className="navbar__logo-sub">Свиленград</span>
                    </div>
                </a>

                <nav className="navbar__links" aria-label="Главна навигация">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="navbar__link">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="navbar__profile" ref={dropdownRef}>
                    <button
                        className={`navbar__profile-btn${dropdownOpen ? " is-active" : ""}`}
                        onClick={() => setDropdownOpen((v) => !v)}
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        aria-label="Потребителско меню"
                    >
                        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <circle cx="14" cy="14" r="13" />
                            <circle cx="14" cy="11" r="4" />
                            <path d="M5.5 23c1.2-3.5 4.6-6 8.5-6s7.3 2.5 8.5 6" strokeLinecap="round" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="navbar__dropdown" role="menu">
                            {user ? (
                                <>
                                    <span className="navbar__dropdown-user">{user.username}</span>
                                    {user.isAdmin && (
                                        <a href="/admin" className="navbar__dropdown-item" role="menuitem">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <path d="M12 2 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-4Z" />
                                            </svg>
                                            Админ панел
                                        </a>
                                    )}
                                    <button
                                        type="button"
                                        className="navbar__dropdown-item navbar__dropdown-item--button"
                                        role="menuitem"
                                        onClick={handleLogout}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Изход
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a href="/login" className="navbar__dropdown-item" role="menuitem">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" y1="12" x2="3" y2="12" />
                                        </svg>
                                        Вход
                                    </a>
                                    <a href="/register" className="navbar__dropdown-item" role="menuitem">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                            <line x1="19" y1="8" x2="19" y2="14" />
                                            <line x1="22" y1="11" x2="16" y2="11" />
                                        </svg>
                                        Регистрация
                                    </a>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <button
                    className={`navbar__hamburger${menuOpen ? " is-open" : ""}`}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={menuOpen ? "Затвори меню" : "Отвори меню"}
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {menuOpen && (
                <nav className="navbar__mobile" aria-label="Мобилна навигация">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="navbar__mobile-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="navbar__mobile-divider" />
                    {user ? (
                        <>
                            {user.isAdmin && (
                                <a href="/admin" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                                    Админ панел
                                </a>
                            )}
                            <button
                                type="button"
                                className="navbar__mobile-link navbar__mobile-link--button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleLogout();
                                }}
                            >
                                Изход
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Вход</a>
                            <a href="/register" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Регистрация</a>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}