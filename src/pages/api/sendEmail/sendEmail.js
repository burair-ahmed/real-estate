import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, service, message } = req.body;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT == 465, // true for SSL, false for TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`, // Use the SMTP user as the sender address
        to: "burair@viralmarketingsolution.com", // recipient's email
        subject: `New Contact Request: ${service}`,
        html: `
          <h3>New Contact Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Type:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
