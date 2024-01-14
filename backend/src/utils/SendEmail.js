const createTransporter = require('./nodemailerConfig');
require('dotenv').config();

const SendEmailController = {
    async sendEmail(to, assunto, texto) {
        const transporter = await createTransporter();
        const novaMensagem = texto;
        try {
            transporter.sendMail({
                from: process.env.SMTP_EMAIL,
                to: to,
                subject: assunto,
                html: `${novaMensagem}`,

            }, (error, info) => {
                const data = moment().format('DD/MM/YYYY hh:mm:ss')
                if (error) {

                    console.error('Erro ao enviar o email: ' + error);
                } else {
                    console.log('Email enviado com sucesso: ' + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
};


module.exports = SendEmailController;