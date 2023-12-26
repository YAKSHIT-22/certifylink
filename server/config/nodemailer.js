const nodemailer = require('nodemailer');
require('dotenv').config();

const message =
  'We thank you wholeheartedly for the contribution made towards Codewave Go Green. Please find the <br> receipt enclosed. We will be sending an 80G certificate in the month of Mar/April 2023. <br><br> Best regards,Codewave';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true,
});

const sendInvoiceMail = async (email, attachmentUrl) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: email,
      subject: 'Certificate of Appreciation',
      html: message,
      attachments: [
        {
          filename: 'Certificate.pdf',
          path: attachmentUrl,
          encoding: 'base64', // Add encoding property if needed
          contentType: 'application/pdf',
        },
      ],
    });
    console.log(`Invoice Mail sent to ${email}`, info);
    return true;
  } catch (err) {
    console.error('Error sending invoice mail:', err);
    return false;
  }
};

module.exports = sendInvoiceMail;
