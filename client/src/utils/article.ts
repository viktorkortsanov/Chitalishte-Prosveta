export const CATEGORY_LABEL: Record<"news" | "event", string> = {
    news: "Новина",
    event: "Събитие",
};

export function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("bg-BG", { day: "numeric", month: "long", year: "numeric" });
}

export function excerptOf(text: string) {
    return text.length > 140 ? `${text.slice(0, 140).trimEnd()}…` : text;
}
