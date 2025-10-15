const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const { sendEmail } = require('./emailController');

// Controller to handle the contact form submission
const submitContactForm = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Save the contact form data to MongoDB
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    // Send a confirmation email to the user who submitted the form
    const subject = 'We Received Your Message';
    const text = `Dear ${name},

Thank you for contacting us! We have received your message and will get back to you shortly.

Your message:
${message}

Best regards,
The Team\nReserveRestaurant`;

    // Send an email to the user confirming their submission
    const emailResult = await sendEmail(email, subject, text);
    console.log('Email sent:', emailResult);  // Debugging email sending

    // Respond with a success message
    res.status(201).json({ message: 'Your message has been received. We will get back to you shortly!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'There was an error submitting your message.' });
  }
};

module.exports = {
  submitContactForm,
};
