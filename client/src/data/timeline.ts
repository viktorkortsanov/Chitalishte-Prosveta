import galleryOldBuildingImg from "../assets/images/030s.jpg";
import galleryProsvetaImg from "../assets/images/423.jpg";
import galleryEventImg from "../assets/images/1559388_797812840281793_8648069332194572911_o.jpg";
import sustaviImg from "../assets/images/sustavi.jpg";
import zvezdaImg from "../assets/images/zvezda.jpg";
import bachoKiro from "../assets/images/bacho-kiro.jpg";

export interface TimelineItem {
    year: string;
    title: string;
    text: string;
    side: "left" | "right";
    image: { src: string; alt: string; position: "left" | "right" };
}

export const TIMELINE: TimelineItem[] = [
    {
        year: "1870",
        title: "Основаване",
        text: `Читалище "Звезда" е основано на 01.03.1870г. по инициатива на главния учител Христо Попмарков. Помещението е в най-голямата стая на училището при черквата "Св. Троица".`,
        side: "left",
        image: { src: zvezdaImg, alt: "Старата сграда на читалището", position: "right" },
    },
    {
        year: "1872",
        title: "Бачо Киро посещава читалището",
        text: `Революционерът и книжовник Бачо Киро посещава читалището и остава с отлични впечатления. Иван Вазов е сред членовете на настоятелството.`,
        side: "right",
        image: { src: bachoKiro, alt: "Бачо Киро", position: "left" },
    },
    {
        year: "1875",
        title: "Първа театрална постановка",
        text: `За първи път се представя пиесата "Многострадалната Геновева" пред турски управници, оставили дар на читалището.`,
        side: "right",
        image: { src: galleryOldBuildingImg, alt: "Старата сграда на читалището", position: "left" },
    },
    {
        year: "1914",
        title: `Ново начало - "Просвета"`,
        text: `Читалището възкръсва под името "Просвета". На централното място в града се издига нова сграда от волни пожертвования на гражданите.`,
        side: "left",
        image: { src: galleryProsvetaImg, alt: "Сградата на читалище Просвета", position: "right" },
    },
    {
        year: "1961",
        title: "Нова сграда",
        text: `Читалище "Просвета" пренася дейността си в нова сграда, в която съществува и до днес.`,
        side: "right",
        image: { src: galleryEventImg, alt: "Новата сграда", position: "left" },
    },
    {
        year: "Днес",
        title: "Живо и активно",
        text: `Танцови, певчески и театрални групи продължават да пазят възрожденския дух на читалището.`,
        side: "left",
        image: { src: sustaviImg, alt: "Съставите на читалището", position: "right" },
    },
];
