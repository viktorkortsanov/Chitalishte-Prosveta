import team1 from "../assets/images/vasil.jpg";
import team2 from "../assets/images/petra.jpg";
import team3 from "../assets/images/viktor.jpg";

export interface LeadershipMember {
    name: string;
    role: string;
    email: string;
    photo: string;
}

export const LEADERSHIP: LeadershipMember[] = [
    {
        name: "Васил Василев",
        role: "Председател",
        email: "vasko_kl@abv.bg",
        photo: team1,
    },
    {
        name: "Петра Беева",
        role: "Секретар",
        email: "polihronos@mail.bg",
        photo: team2,
    },
    {
        name: "Виктор Корцанов",
        role: "IT Специалист",
        email: "viktorkortsanov@gmail.com",
        photo: team3,
    },
];
