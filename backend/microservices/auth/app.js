const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');
app.use(bodyParser.json());
app.use(cors());

const security = require('./src/security/securityMiddleware');


const server = http.createServer(app);
security.config(app, server);

server.listen(4000, () => {
    console.log("==========================");
    console.log(`Auth microservice running!`);
    console.log("==========================");
});

app.get('/auth', (req, res) => {
    res.send('This is auth service');
});

app.post('/auth/login', async (req, res) => {
    const result = await service.login(req.body.username, req.body.password);
    if(res.status == 200){
        res.cookie('jwt', result.response, {httpOnly:true, secure:false});
    }
    res.status(result.status).send(result.response);
});

app.get('/auth/users', async (req, res) => {
    const result = await service.users();
    res.status(result.status).send(result.response);
});
app.get('/auth/users/:id', async (req, res) => {
    console.log(req.session);
    const result = await service.user(req.params.id).catch(err => console.error(err));
    res.status(result.status).send(result.response);
});
app.post('/auth/users/update', async (req, res) => {
    let id = res.locals.id;
    const result = await service.update(id, req.body);
    res.status(result.status).send(result.response);
});
app.post('/auth/users/status/:id', async (req, res) => {
    let uid = res.locals.id;
    const result = await service.setStatus(uid, req.params.id, req.body);
    res.status(result.status).send(result.response);
});

app.post('/auth/register', async (req, res) => {
    const result = await service.register(req.body);
    res.status(result.status).send(result.response);
});

app.get('/auth/users/:id/permissions', async (req, res) => {

});

app.get('/auth/users/permissions', async (req, res) => {

});

app.post('/auth/users/permissions/create', async (req, res) => {

});

app.post('/auth/users/:id/permissions/update', async (req, res) => {

});

app.get('/test/authapi', async (req, res) => {
    res.status('Found cars api');
});