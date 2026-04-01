const mailer = require("nodemailer");

const mailSend = async (to, subject, text) => {
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "pythonforsamir@gmail.com",
      pass: "btsx mzuz vvsm zepb",
    },
  });
  const mailOptions = {
    to:to,
    from:"pythonforsamir@gmail.com",
    subject:subject,
    //text:text
    html:`<h1>${text}</h1>`
  };

  await transport.sendMail(mailOptions)

};
module.exports = mailSend
