const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: true, // Ou true se estiver usando uma conexão segura
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

module.exports = createTransporter;
