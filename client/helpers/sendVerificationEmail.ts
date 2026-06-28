import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_TOKEN);

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #0056b3;">Hello, ${username}!</h2>
            <p>Thank you for signing up. Please use the verification code below to complete your registration:</p>
            <div style="margin: 20px 0; padding: 10px; background-color: #f9f9f9; border: 1px dashed #ccc; text-align: center;">
              <strong style="font-size: 18px; color: #333;">${verifyCode}</strong>
            </div>
            <p>If you did not request this, please ignore this email or contact our support team.</p>
            <p>Best regards,<br>The Resend Team</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">
              This email was sent to ${email}. If you have any questions, contact us at support@resend.dev.
            </p>
          </div>
        `,
      });

      console.log("email data in side helper", data); 
      
      return { success: true, message: 'Verification email sent successfully.' };
    } catch (error) {
      console.error('Error sending verification email:', error);
      return { success: false, message: 'Failed to send verification email.' };
    }
  }
  