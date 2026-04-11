const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text)=>{
        if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS){
            throw new Error('Email credentials are not set in environment variables');
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text,
        };
try{
      const info = await transporter.sendMail(mailOptions);
      return info;
    }catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
}
module.exports={sendEmail};

 