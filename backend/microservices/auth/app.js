const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');
app.use(bodyParser.json({limit:'20mb'}));
app.use(cors());

const security = require('./src/security/securityMiddleware');

const { DORProtection } = require('./src/service');


const server = http.createServer(app);
security.config(app, server); //

const csrf = require('csurf');
const csrfProtection = csrf({cookie:true});

app.use((req, res, next) => {
    if(Object.keys(req.body).length > 0){
        console.log(req.body)
    }

    if(Object.keys(req.params).length > 0){
        console.log(req.params);
    }

    next();
});

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
    if(result.status == 200){
        res.cookie('jwt', result.response, {httpOnly:true, secure:false});
    }
    res.status(result.status).send(result.response);
});

app.get('/auth/users', service.generatePermissionMiddleware('*'),  async (req, res) => {
    console.log(req.session);
    console.log(req.headers.cookie);
    const result = await service.users();
    res.status(result.status).send(result.response);
});
app.get('/auth/users/:id', DORProtection, async (req, res) => {
    console.log(req.cookie);
    const result = await service.user(req.params.id).catch(err => console.error(err));
    res.status(result.status).send(result.response);
});
app.post('/auth/users/update', async (req, res) => {
    let id = res.locals.id;
    const result = await service.update(id, req.body);
    res.status(result.status).send(result.response);
});
app.post('/auth/users/status/:id', DORProtection,  async (req, res) => {
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


app.get('/auth/users/test/testroute1', service.generatePermissionMiddleware('testpermission1'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute1'
     })
})

app.get('/auth/users/test/testroute2', service.generatePermissionMiddleware('testpermission2'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute2'
     })
})

app.get('/auth/users/test/testroute3', service.generatePermissionMiddleware('testpermission3'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute3'
     })
})

app.get('/auth/users/test/testroute4', service.generatePermissionMiddleware('testpermission4'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute4'
     })
})

app.post('/auth/testInject', async (req, res) => {
    res.status(200).send();
});

app.post('/auth/processForm', csrfProtection, async (req, res) => {
    //console.log(req.body);
    console.log('COOKIES:' , req.cookies);
    res.status(200).send();
});

app.get('/auth/testForm', csrfProtection, async (req, res) => {
    res.status(200).send({_csrf: req.csrfToken()});
});