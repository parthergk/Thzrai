import os
from dotenv import load_dotenv
from fastapi_mail import ConnectionConfig, MessageSchema, FastMail;

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("EMAIL_USER"),
    MAIL_PASSWORD=os.getenv("EMAIL_PASS"),
    MAIL_FROM=os.getenv("EMAIL_USER"),
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

async def send_otp(email: str, username: str, verify_code: str):
    html = f"""
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #0056b3;">Hello, {username}!</h2>

        <p>
            Thank you for signing up. Please use the verification code below
            to complete your registration:
        </p>

        <div style="margin: 20px 0; padding: 10px; background-color: #f9f9f9; border: 1px dashed #ccc; text-align: center;">
            <strong style="font-size: 18px;">
                {verify_code}
            </strong>
        </div>

        <p>
            If you did not request this, please ignore this email.
        </p>

        <p>
            Best regards,<br>
            The Team
        </p>

        <hr />

        <p style="font-size: 12px; color: #888;">
            This email was sent to {email}
        </p>
    </div>
    """

    message = MessageSchema(
        subject="Your Verification Code",
        recipients=[email],
        body=html,
        subtype="html",
    )
    fm = FastMail(conf)
    await fm.send_message(message)