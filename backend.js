const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Hello There!</h3>
            <ul>
                <li>${req.body.name}</li>
                <li>${req.body.email}</li>
                <li>${req.body.message}</li>
            </ul>    
        `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'il4swpjxwjomgvxq@ethereal.email', // generated ethereal user
                pass: 'scEkwb3mP6sb9vHUCm' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: req.body.email, // sender address
            to: 'il4swpjxwjomgvxq@ethereal.email', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: req.body.message, // plain text body
            html: htmlEmail
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
})