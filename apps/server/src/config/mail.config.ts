import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "priyanshu.kun555@gmail.com",
    pass: "ajlnlfefvdbdrwtd",
  },
  tls: {
    ciphers: "SSLv3",
  },
});
