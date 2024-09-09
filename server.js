const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname)));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hatdooooog1@gmail.com',   // Replace with your email
        pass: 'ioys owuw wrwc xkei'     // Replace with your email password or app password
    }
});

// Route to handle the contact form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,  // Sender's email address
        to: 'shinlink1105@gmail.com',  // Replace with your email (where you want to receive messages)
        subject: `New message from ${name} via Adopt a Cat Website`,
        text: `You received a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ status: 'error', message: 'Failed to send email' });
        }
        console.log(`Email sent: ${info.response}`);
        return res.json({ status: 'success', message: 'Your message has been sent!' });
    });
});

app.post('/adopt', (req, res) => {
    const { name, email, cat } = req.body;

    const mailOptions = {
        from: email,
        to: 'shinlink1105@gmail.com', // Replace with your email (where you want to receive adoption notices)
        subject: `${name} has adopted ${cat}!`,
        text: `Adoption request from ${name} (${email}):\n\nThey have adopted ${cat}.\nPlease contact them for further processing.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ status: 'error', message: 'Failed to send email' });
        }
        console.log(`Adoption email sent: ${info.response}`);
        return res.json({ status: 'success', message: `Adoption of ${cat} confirmed!` });
    });
});

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen to server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
