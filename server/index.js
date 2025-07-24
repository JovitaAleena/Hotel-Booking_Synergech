import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// Configure your email credentials here
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aleena05jovita@gmail.com', // replace with your email
    pass: 'alqj gwpg cuod jtys' // replace with your app password
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  const otp = generateOTP();
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com', // replace with your email
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    });
    res.json({ success: true, otp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
