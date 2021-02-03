const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'andrzubrytskyi@gmail.com', // Change to your recipient
    from: 'andreizubritskiy@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
};

sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.error(error);
    });
