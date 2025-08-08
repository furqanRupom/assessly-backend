import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, html: string,subject:string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.mail_host,
            port: Number(config.mail_port),
            auth: {
                user: config.mail_user,
                pass: config.mail_pass,
            },
        });
        const mailOptions = {
            from: `"Assessly" <${config.mail_user}>`,
            to,
            subject,
            html,
        };
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log(config.mail_host, config.mail_port, config.mail_user, config.mail_pass);
        console.error('Error sending email:', error);
        throw error; // Rethrow the error to propagate it up the call stack if needed
    }
};

export default sendEmail;
