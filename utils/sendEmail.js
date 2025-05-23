const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/userModel');

const sendEmail = async(options) =>{
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, //if secure is true els 587
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }) 

    // 2) Define the email options (from, to, subject, text)
    const mailOpts = {
        from: "Report App <meiit09871@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    // 3) Actually send the email
    await transporter.sendMail(mailOpts);
};

module.exports = sendEmail