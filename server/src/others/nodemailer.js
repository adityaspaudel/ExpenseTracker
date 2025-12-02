// others/nodemailer.js
const nodemailer = require("nodemailer");


// EMAIL_USER = "adityaspaudel@gmail.com";
// EMAIL_PASS = "ivmf ilgt npdb ncvn";

// creating transporter for sending email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
