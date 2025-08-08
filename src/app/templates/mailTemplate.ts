class MailTemplate {
    private buttonStyle = `
    background-color: #9747FF;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `
    private emailContainer(content: string): string {
        return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);">
            ${content}
          </div>
        </body>
      </html>
    `
    }
    private emailFooter(): string {
    return  `
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
        <p>If you did not request this, please ignore this email.</p>
        <p>&copy; ${new Date().getFullYear()} Assessly. All rights reserved.</p>
      </div>
    `
    }
   
    async emailVerifyTemplate(name: string, code: string): Promise<string> {
        const content = `
            <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
                <h1>Hello ${name},</h1>
                <p>Thank you for registering with us.</p>
                <p>Please use the following verification code to verify your email address:</p>
                <div style="font-size: 2em; letter-spacing: 0.5em; font-weight: bold; background: #f3f3f3; padding: 16px 0; text-align: center; border-radius: 8px; margin: 24px 0;">
                    ${code}
                </div>
                <p>If you did not request this, please ignore this email.</p>
            </div>
            ${this.emailFooter()}
        `;
        return this.emailContainer(content) ;
    }
}

export const mailTemplates = new MailTemplate()