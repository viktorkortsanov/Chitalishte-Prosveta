export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: "Начало", href: "/" },
    { label: "За нас", href: "/za-nas" },
    { label: "Новини и Събития", href: "/novini-i-sabitiya" },
    { label: "Дейности", href: "/deynosti" },
    { label: "Галерия", href: "/galeriya" },
    { label: "Контакти", href: "/kontakti" },
];
