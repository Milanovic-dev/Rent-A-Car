const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');
const device = require('express-device');
const { log, logCustom } = require('./src/security/logger');
app.use(bodyParser.json({limit:'20mb'}));
app.use(cors());
app.use(device.capture());

const security = require('./src/security/securityMiddleware');

const { DORProtection } = require('./src/service');

const server = http.createServer(app);
security.config(app, server);


server.listen(4000, () => {
    console.log(`Auth microservice running!`);
    logCustom('Service started on port 4000');
});

app.get('/auth', (req, res) => {
    res.send('This is auth service');
});

app.post('/auth/users/updatePassword', async(req, res) => {
    const result = await service.updatePassword(req.body, req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.post('/auth/login', async (req, res) => {
    const result = await service.login(req.body.username, req.body.password);
    if(result.status == 200){
        res.cookie('jwt', result.response, {httpOnly:true, secure:false});
    }
    log(req, result.status);
    logCustom(`INFO Attempted login for user ${req.body.username}`)
    res.status(result.status).send(result.response);
});

app.get('/auth/users',  async (req, res) => {
    const result = await service.users();
    log(req, result.status);
    res.status(result.status).send(result.response);
});
app.get('/auth/users/update/status/:id/:status', async (req, res) => {
    const result = await service.updateStatus(req.params.id, parseInt(req.params.status) );
    log(req, result.status);
    res.status(result.status).send(result.response);
});
app.delete('/auth/users/remove/:id', async (req, res) => {
    const result = await service.removeUser(req.params.id );
    log(req, result.status);
    logCustom(`WARNING Attempted to remove user ${req.param.id}`)
    res.status(result.status).send(result.response);
});


app.post('/auth/users/update', async (req, res) => {
    let id = res.locals.id;
    const result = await service.update(id, req.body);
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.post('/auth/users/status/:id',  async (req, res) => {
    let uid = res.locals.id;
    const result = await service.setStatus(uid, req.params.id, req.body);
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.post('/auth/register', async (req, res) => {
    const result = await service.register(req.body, true);
    log(req, result.status);
    logCustom(`INFO Attempted register  ${JSON.stringify(req.body)}`)
    res.status(result.status).send(result.response);
});

app.get('/auth/email/verify/:uid/:code', async (req, res) => {
    const result = await service.verifyEmail(req.params.uid, req.params.code);
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.get('/auth/users/:id', async (req, res) => {
    const result = await service.user(req.params.id).catch(err => console.error(err));
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.get('/auth/sessionUser', async(req, res) => {
    const result = await service.sessionUser(req.headers.authorization);
    res.status(result.status).send(result.response);
})


app.get('/auth/logs', service.generatePermissionMiddleware('*'),  async(req, res) => {
    const log = 'logs.log';
    res.download(log);
}); 



