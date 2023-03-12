const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect("mongodb://localhost/forms", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected.");
});

// Define a form schema
const formSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: String,
  phone: String,
});

// Create a Form model based on the schema
const Form = mongoose.model("Form", formSchema);

app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const { name, dob, email, phone } = req.body;

  // TODO: Perform form validation here

  // Save the form data to the database
  const phoneRegex = /^\d{10}$/;

  // Validate phone number using regex
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }
  const form = new Form({ name, dob, email, phone });
  form.save((err) => {
    if (err) {
      console.error("Error saving form:", err);
      res.status(500).send("An error occurred while saving the form.");
    } else {
      console.log("Form saved successfully.");
      res.status(200).send("Form submitted successfully!");
    }
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
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

app.get("/submitted-forms", (req, res) => {
  // Retrieve all the forms from the database
  Form.find((err, forms) => {
    if (err) {
      console.error("Error retrieving forms:", err);
      res.status(500).send("An error occurred while retrieving the forms.");
    } else {
      // Render a template that displays the forms
      res.render("submitted-forms", { forms });
    }
  });
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});
