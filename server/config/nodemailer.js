const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true,
});
await new Promise((resolve, reject) => {
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      console.log("Server is ready to take our messages");
      resolve(success);
    }
  });
});


const sendMail = async (studentData, org, attachmentUrl, fromMail) => {

  try {
    const info = await transporter.sendMail({
      from: fromMail,
      to: studentData.studentEmail,
      subject: "Certificate of Appreciation",
      html: `
      <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 20px;
                                background-color: #f4f4f4;
                            }
                    
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                    
                            h1 {
                                color: #333333;
                                text-transform:capitalize;
                            }
                    
                            p {
                                color: #555555;
                                font-size: 18px;
                            }
                    
                            .contact-info {
                                margin-top: 20px;
                            }
                    
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                margin-top: 20px;
                                text-decoration: none;
                                background-color: #4caf50;
                                color: #ffffff;
                                border-radius: 5px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Dear ${studentData.studentName},</h1>
                            <p>We hope this email finds you well. We would like to express our sincere gratitude for your active participation in the ${studentData.eventsName}. Your enthusiasm and contribution significantly contributed to the success of the event.</p>
                            <p>
As a token of our appreciation, we are pleased to present you with the Certificate of Participation for your valuable involvement. Your dedication and commitment to the event have not gone unnoticed, and we are grateful for your support.
</p>
<h2>
Certificate Details:
</h2>
<p>Event Name: ${studentData.eventsName}</p>
<p>Participant's Name: ${studentData.studentName}</p>
<p>
Please find the attached certificate along with this email. If you have any questions or need further assistance, feel free to reach out to us.
</p>
<div class="contact-info">
                                <p>Once again, thank you for being a part of ${studentData.eventsName}. We look forward to your continued participation in future events.</p>
                            </div>
                            <p>Best Regards,<br>${org}</p>
                        </div>
                    </body>
                    </html>
`,
      attachments: [
        {
          filename: `Certificate-${studentData.studentName}.pdf`,
          path: attachmentUrl,
          encoding: "base64", // Add encoding property if needed
          contentType: "application/pdf",
        },
      ],
    });
    console.log(`Pdf Mail sent to ${studentData.studentEmail}`, info);
    return true;
  } catch (err) {
    console.error("Error sending Pdf mail:", err);
    return false;
  }
};

module.exports = sendMail;
