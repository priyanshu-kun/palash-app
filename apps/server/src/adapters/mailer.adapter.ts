import { transporter } from "../config/mail.config.js";

export async function sendMail() {
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <priyanshu-kun101@outlook.com>', // sender address
        to: "priyanshuSharma507@protonmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
}