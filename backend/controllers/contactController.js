const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const {sendEmail} = require('./emailController');

const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Save the contact form data to MongoDB
        const newContact = new Contact({
          name,
          email,
          message,
        });
    
        await newContact.save();
        const subject = 'New Contact Form Submission';
    const text = `You have received a new message from:

    Name: ${name}
    Email: ${email}
    Message: ${message}`;

    // Send the email to the designated recipient
    await sendEmail('recipient-email@example.com', subject, text);

        // Respond with a success message
        res.status(201).json({ message: 'Your message has been received. We will get back to you shortly!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error submitting your message.' });
      }
    };
    
    module.exports = {
      submitContactForm
    };