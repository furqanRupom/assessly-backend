class MailTemplate {
  private primaryColor = '#555879';  // Dark slate blue
  private secondaryColor = '#98A1BC';  // Soft slate blue
  private accentColor = '#DED3C4';  // Warm beige
  private bgColor = '#f8f6f1ff';  // Cream background
  private textColor = '#333333';  // Dark gray for text
  private lightText = '#555879';  // Primary color for secondary text

  private buttonStyle = `
        display: inline-block;
        background-color: ${this.primaryColor};
        color: white;
        border: none;
        padding: 14px 28px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 4px;
        text-decoration: none;
        text-align: center;
        margin: 10px 0;
        transition: background-color 0.3s ease;
    `;

  private emailContainer(content: string): string {
    return `
        <html>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;color: ${this.textColor};">
                <div style="max-width: 600px; margin: 30px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); border: 1px solid ${this.accentColor};">
                    <div style="background-color: ${this.primaryColor}; padding: 25px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-weight: 600; letter-spacing: 0.5px;">Assessly</h1>
                    </div>
                    <div style="padding: 30px;">
                        ${content}
                    </div>
                </div>
            </body>
        </html>
        `;
  }

  private emailFooter(): string {
    return `
        <div style="margin-top: 40px; text-align: center; font-size: 13px; color: ${this.lightText}; line-height: 1.6; border-top: 1px solid ${this.accentColor}; padding-top: 20px;">
            <p>If you did not request this, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} Assessly. All rights reserved.</p>
            <p style="margin-top: 10px;">
                <a href="#" style="color: ${this.primaryColor}; text-decoration: none; font-weight: 500;">Privacy Policy</a> • 
                <a href="#" style="color: ${this.primaryColor}; text-decoration: none; font-weight: 500;">Terms of Service</a>
            </p>
        </div>
        `;
  }

  private codeBoxStyle = `
        font-size: 22px;
        letter-spacing: 3px;
        font-weight: bold;
        background-color: ${this.bgColor};
        padding: 18px;
        text-align: center;
        border-radius: 4px;
        margin: 25px 0;
        color: ${this.primaryColor};
        border: 1px solid ${this.secondaryColor};
    `;

  async emailVerifyTemplate(name: string, code: string): Promise<string> {
    const content = `
            <h2 style="color: ${this.primaryColor}; margin-top: 0; font-weight: 600;">Hello ${name},</h2>
            <p style="line-height: 1.6; color: ${this.textColor}; margin-bottom: 25px;">Thank you for registering with us. Please use the following verification code to verify your email address:</p>
            
            <div style="${this.codeBoxStyle}">
                ${code}
            </div>
            
            <p style="line-height: 1.6; color: ${this.lightText}; font-size: 14px;">This code will expire in 30 minutes. If you didn't request this, please ignore this email.</p>
            
            ${this.emailFooter()}
        `;
    return this.emailContainer(content);
  }

  async passwordResetTemplate(name: string, resetLink: string): Promise<string> {
    const content = `
            <h2 style="color: ${this.primaryColor}; margin-top: 0; font-weight: 600;">Hello ${name},</h2>
            <p style="line-height: 1.6; color: ${this.textColor}; margin-bottom: 25px;">We received a request to reset your password. Click the button below to proceed:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="${this.buttonStyle}">Reset Password</a>
            </div>
            
            <p style="line-height: 1.6; color: ${this.lightText}; font-size: 14px; margin-bottom: 5px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; font-size: 13px; color: ${this.primaryColor}; background-color: ${this.bgColor}; padding: 12px; border-radius: 4px; border: 1px solid ${this.accentColor};">
                ${resetLink}
            </p>
            
            <p style="line-height: 1.6; color: ${this.lightText}; font-size: 14px; margin-top: 25px;">This link will expire in 1 hour.</p>
            
            ${this.emailFooter()}
        `;
    return this.emailContainer(content);
  }
}

export const mailTemplates = new MailTemplate();