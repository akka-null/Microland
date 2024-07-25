import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
let mailOptions = {
  from: process.env.EMAIL_SENDER,
  to: "",
  subject: "",
  html: ``,
};
export { transporter, mailOptions };
