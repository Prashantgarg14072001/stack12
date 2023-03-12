const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const { name, dob, email, phone } = req.body;

 

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port:587,
    service: "gmail",
    auth: {
      user: "domenica.ebert55@ethereal.email",
      pass: "zW79gVHrnPgkKzXCtk",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Thank you for submitting the form",
    text: `Dear ${name},\n\nThank you for submitting the form.\n\nBest regards,\nThe Form Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("An error occurred while sending the email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Form submitted successfully!");
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
