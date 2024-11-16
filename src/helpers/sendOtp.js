import nodemailer from  "nodemailer"
import { otp } from "../config/index.config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: otp.user,
      pass: otp.pass,
    },
  });

export const sendMail = async (to, subject, text) => {
    transporter.sendMail(
      {
        from: otp.user,
        to,
        subject,
        text,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  };