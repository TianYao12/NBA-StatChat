// code below is written in GCP, just written here for remembering later

const functions = require('@google-cloud/functions-framework');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '...', 
    pass: '...'
  }
});

functions.cloudEvent('helloGCS', async (cloudEvent) => {
  const file = cloudEvent.data;
  const fileName = file.name;

  const mailOptions = {
    from: '...', 
    to: '...',
    subject: 'New File Uploaded to GCS',
    text: `A new file has been uploaded:
           - File Name: ${fileName}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

