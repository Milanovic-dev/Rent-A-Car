var nodemailer = require('nodemailer');
var Queue = require('better-queue');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//env
const dotenv = require('dotenv');
dotenv.config();


var mailQueue = new Queue(async (batch, cb) => {
    console.log('mail worker')
    console.log(batch.length)
    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    for (let i = 0; i < batch.length; i++) {
        console.log(batch[i])

        var mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: batch[i].to,
            subject: batch[i].subject,
            text: batch[i].message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    }

    cb();
}, { batchSize: 20, batchDelay: 10000 });


const send = async (data) => {

    mailQueue.push({
        to: data.to,
        subject: data.subject,
        message: data.message,
    });

    return {
        response: {
            error: null,
            successful: true
        }, status: 200
    };
}



const login = async(username, password) => {

    if (username != process.env.APP_USERNAME) {
        return {
            response: {
                error: 'User not exists'
            },
            status: 404
        };

    } else {
        if (bcrypt.compareSync(password, process.env.APP_PASSWORD)) {
            let token = jwt.sign({ "id": process.env.APP_USERNAME }, process.env.JWT_SECRET, { algorithm: 'HS256' });
            return {
                response: {
                    token: token
                },
                status: 200
            };

        } else {
            return {
                response: {
                    error: 'Wrong creditials'
                },
                status: 400
            };

        }
    }
}



module.exports = { send, login }
