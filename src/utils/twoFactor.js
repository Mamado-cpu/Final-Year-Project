const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Create a transporter if SMTP settings are provided via env.
let transporter = null;
async function initializeTransporter() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
        try {
            await transporter.verify();
            console.log('SMTP transporter is ready to send emails');
        } catch (error) {
            console.error('SMTP transporter verification failed:', error);
            transporter = null; // Disable if verification fails
        }
    }
}
initializeTransporter();

async function sendOtp(user, code, method = 'email') {
    if (!user.email) {
        console.log('No email provided for user. OTP is', code);
        return;
    }

    if (!transporter) {
        console.log('No SMTP transporter configured. OTP for', user.email, 'is', code);
        return;
    }

    const mailOptions = {
        from: process.env.SMTP_FROM || 'no-reply@example.com',
        to: user.email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}. It expires in 5 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to', user.email);
    } catch (error) {
        console.error('Failed to send verification email:', error.message);
        console.log('Code for manual verification:', code);
    }
}

module.exports = {
    sendOtp
};
