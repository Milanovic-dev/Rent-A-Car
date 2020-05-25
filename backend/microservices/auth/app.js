const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');
const { registerForGateway } = require('./src/config/index');
app.use(bodyParser.json());
app.use(cors());

registerForGateway('auth');

app.listen(4000, () => {
    console.log("==========================");
    console.log(`Auth microservice running!`);
    console.log("==========================");
});

app.get('/', (req, res) => {
    res.send('This is auth service');
});

app.post('/login', async (req, res) => {
    const result = await service.login(req.body.username, req.body.password);
    if(res.status == 200){
        res.cookie('auth', result.response);
    }
    res.status(result.status);
});

app.get('/users', async (req, res) => {
    const result = await service.users();
    res.status(result.status).send(result.response);
});
app.get('/users/:id', async (req, res) => {
    // let id = res.locals.id;
    const result = await service.user(req.params.id);
    res.status(result.status).send(result.response);
});
app.post('/users/update', async (req, res) => {
    let id = res.locals.id;
    const result = await service.update(id, req.body);
    res.status(result.status).send(result.response);
});
app.post('/users/status/:id', async (req, res) => {
    let uid = res.locals.id;
    const result = await service.setStatus(uid, req.params.id, req.body);
    res.status(result.status).send(result.response);
});

app.post('/register', async (req, res) => {
    const result = await service.register(req.body);
    res.status(result.status).send(result.response);
});

app.get('/users/:id/permissions', async (req, res) => {

});

app.get('/users/permissions', async (req, res) => {

});

app.post('/users/permissions/create', async (req, res) => {

});

app.post('/users/:id/permissions/update', async (req, res) => {

});

app.get('/test/authapi', async (req, res) => {
    res.status('Found cars api');
});


app.get('/users/testroute1', service.generatePermissionMiddleware('testpermission1'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute1'
     })
})

app.get('/users/testroute2', service.generatePermissionMiddleware('testpermission2'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute2'
     })
})

app.get('/users/testroute3', service.generatePermissionMiddleware('testpermission3'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute3'
     })
})

app.get('/users/testroute4', service.generatePermissionMiddleware('testpermission4'), async (req, res) => {
    res.status(200).send({ 
        route: '/users/testroute4'
     })
})