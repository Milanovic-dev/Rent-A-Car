const service = require('../service/mailService');
const jwt = require('jsonwebtoken');
//env
const dotenv = require('dotenv');
dotenv.config();


const jwtMiddleware = function (req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(500).json({ error: "Not Authorized" });
                return;
            }

            if (user.id == process.env.APP_USERNAME) {
                return next();
            } else {
                res.status(500).json({ error: "Not Authorized" });
                return;

            }
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        return;
    }
}

module.exports = function (app) {
    app.post('/api/auth/login', async (req, res) => {
        console.log(req.body)
        let result = await service.login(req.body.username, req.body.password);
        res.status(result.status).send(result.response);
    });


    app.post('/api/mail/send', jwtMiddleware, async (req, res) => {
        let result = await service.send(req.body);
        res.status(result.status).send(result.response);
    });
};

