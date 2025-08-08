import { mailTemplates } from "../../templates/mailTemplate";
import sendEmail from "../../utils/sendMail";

class Mail {
   async sendVerificationEmail(name:string,email: string, otp: string): Promise<void> {
     const template = await mailTemplates.emailVerifyTemplate(name, otp);
     const subject = 'Verify your email';   
     await sendEmail(email, template, subject);

    }
    async sendPasswordResetEmail(name: string, email: string, resetLink: string): Promise<void> {
        const template = await mailTemplates.passwordResetTemplate(name, resetLink);
        const subject = 'Reset your password';
        await sendEmail(email, template, subject);
    }
}

export const mailService = new Mail();