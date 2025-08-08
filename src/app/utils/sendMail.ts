import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, html: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.mail_host,
            port: Number(config.mail_port),
            secure: config.node_env === 'production',
            auth: {
                user: config.mail_user,
                pass: config.mail_pass,
            },
        });

        const info = await transporter.sendMail({
            from: 'fab554176@gmail.com',
            to: to,
            subject: 'Please Reset your password within 10 minutes.',
            text: '',
            html,
        });

        console.log('Email sent:', info);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error to propagate it up the call stack if needed
    }
};

export default sendEmail;
