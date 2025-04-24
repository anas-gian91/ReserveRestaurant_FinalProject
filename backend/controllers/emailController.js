const nodemailer = require('nodemailer');

const sendEmail = async (req,res)=>{
    const {email, subject, text} = req.body;
    try{
        const transporter = nodemailer.createTransport({
            service: 'AOL',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
 }
 module.exports={sendEmail};

 