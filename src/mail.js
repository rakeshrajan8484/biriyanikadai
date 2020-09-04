const nodemailer = require("nodemailer");
async function main(props) {
    console.log(props);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: "biriyanikadai2020@gmail.com", // generated ethereal user
            pass: "manoj2210", // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: 'biriyanikadai2020@gmail.com', // sender address
        to: "rakeshrajan8484@gmail.com", // list of receivers
        subject: "new order at Turning Point", // Subject line
        text: `Biriyani order for  ${props.quantity} plates from ${props.address} has been placed. Mobile: ${props.phone}, Amount: ${props.amount}`
    };
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = main