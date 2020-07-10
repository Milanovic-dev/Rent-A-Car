const fetch = require('node-fetch');
let mailServerJWT = null;


fetch(process.env.MAIL_SERVER_URL + '/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',

    },
    body: JSON.stringify({
        username: process.env.MAIL_SERVER_USERNAME,
        password: process.env.MAIL_SERVER_PASSWORD
    })
}).then((res) => res.json()).then((result) => {
    if (result.token)
        mailServerJWT = result.token;
});

const sendMail = (to, subject, message) => {
    if (!mailServerJWT){
        console.log('not logged in to mail server');
        return;
    }

    fetch(process.env.MAIL_SERVER_URL + '/api/mail/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mailServerJWT}`
        },
        body: JSON.stringify({
            to,
            subject,
            message
        })
    }).then((res) => res.json()).then((result) => {
        console.log('mail pushed to mail server queue');
    });
}


module.exports = {
    sendMail
}