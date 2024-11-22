const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ugetom23@gmail.com', // replace with your email
        pass: 'evbn mwjs lsav qdeu' // replace with your email password or app-specific password
    }
});

// Route to send email
app.post('/send-email', (req, res) => {
    const { name, age, blinkCount, headTurnCount, fixationCount, fixationDuration } = req.body;

    const mailOptions = {
        from: 'ugetom23@gmail.com', 
        to: 'A3423007@sriher.edu.in', // replace with your desired recipient email
        subject: `Detailed Eye Tracking Report for ${name} (Age: ${age})`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Eye Tracking Data Summary</h2>
                <p><strong>Participant Name:</strong> ${name}</p>
                <p><strong>Age:</strong> ${age}</p>
                <hr style="border: 0; border-top: 1px solid #ddd;">
                <h3>Data Collected</h3>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Blink Count:</strong> ${blinkCount}</li>
                    <li><strong>Head Turn Count:</strong> ${headTurnCount}</li>
                    <li><strong>Fixation Count:</strong> ${fixationCount}</li>
                    <li><strong>Fixation Duration:</strong> ${fixationDuration} minutes</li>
                </ul>
                <p style="margin-top: 20px;">Thank you for using our eye tracking system.</p>
                <p>Best Regards,</p>
                <p style="color: #4CAF50; font-weight: bold;">Raveena A</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email', details: error });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
