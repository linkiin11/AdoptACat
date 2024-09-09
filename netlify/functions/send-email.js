const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const formData = JSON.parse(event.body);

  // Set up nodemailer with your email provider's SMTP server
  let transporter = nodemailer.createTransport({
    service: 'gmail', // or any email service provider you are using
    auth: {
      user: 'hatdooooog1@gmail.com', // your email
      pass: 'ioys owuw wrwc xkei', // your email password or app password
    },
  });

  // Email options
  let mailOptions = {
    from: 'hatdooooog1@gmail.com',
    to: 'shinlink1105@gmail.com', // or another recipient
    subject: `New Contact Form Submission from ${formData.name}`,
    text: `Message from ${formData.name} (${formData.email}):\n\n${formData.message}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.toString() }),
    };
  }
};
