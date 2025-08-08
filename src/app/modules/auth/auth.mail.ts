import { mailTemplates } from "../../templates/mailTemplate";
import sendEmail from "../../utils/sendMail";

class Mail {
   async sendVerificationEmail(name:string,email: string, otp: string): Promise<boolean> {
     const template = await mailTemplates.emailVerifyTemplate(name, otp);   
     await sendEmail(email, template);
     return true;

    }
}

export const mailService = new Mail();