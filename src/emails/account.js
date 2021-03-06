const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'kalyani.deshmukh@sjsu.edu',
//     from: 'kalyani.deshmukh@sjsu.edu',
//     subject: 'Thanks for joining in!',
//     text: `Welcome to the app, Let me know how you get along with the app.`
// })



const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kalyani.deshmukh@sjsu.edu',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kalyani.deshmukh@sjsu.edu',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
