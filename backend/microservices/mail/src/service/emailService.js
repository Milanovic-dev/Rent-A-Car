//env
const dotenv = require('dotenv');
dotenv.config();

var nodemailer = require('nodemailer');

const sendMail = async (to, subject, message) => {
  var transporter = nodemailer.createTransport({
      host: SMTPServer,
      port: SMTPPort,
      secure: true,
      requireTLS: true,
      auth: {
          user: SMTPUsername,
          pass: SMTPPassword
      },
      tls: {
          rejectUnauthorized: false
      }
  });

  var mailOptions = {
      from: SMTPUsername,
      to: to,
      subject: subject,
      text: message
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

module.exports = {
  send: sendMail
};
