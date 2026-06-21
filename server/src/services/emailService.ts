import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const emailService = {
    async sendVerificationEmail(to: string, token: string) {
        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Потвърдете своя имейл адрес',
            html: `
                <p>Здравейте,</p>
                <p>Моля, потвърдете своя имейл адрес, за да завършите регистрацията си в читалище „Просвета“:</p>
                <p><a href="${verificationLink}">${verificationLink}</a></p>
                <p>Линкът е валиден 24 часа.</p>
            `,
        });
    },
}
