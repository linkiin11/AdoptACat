const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const data = JSON.parse(event.body);

  // Email sending logic using nodemailer or another service
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hatdooooog1@gmail.com',
      pass: 'ioys owuw wrwc xkei'
    }
  });

  let mailOptions = {
    from: 'hatdooooog1@gmail.com',
    to: 'shinlink1105@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${data.name}\nMessage: ${data.message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Email sent successfully'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error sending email'
    };
  }
};
