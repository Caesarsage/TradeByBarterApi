const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  try {
    // transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // mail options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.text,
    };
    //
    let info = await transporter.sendMail(mailOptions);
    if (!info) console.log("mail not sent");
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendMail;
