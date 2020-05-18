
const registerForGateway = (serviceName) => {
    const Pusher = require('pusher');
    const internalIp = require('internal-ip');
    
    const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER,
        useTLS: true
    });
    
    let svc = {};
    
    internalIp.v4()
        .then(ip => {
            svc = {
                prefix: `/api/${serviceName}`,
                port: 4000,
                address: ip
            };
            console.log(`Registering service ${serviceName} with ip ${ip}`);
            pusher.trigger('XML-Rent-a-Car', 'register', svc);
        }).catch(err => console.error(err));
    
    process.on('SIGINT', () => {
        console.log('Deregistering service...');
    
        pusher.trigger('XML-Rent-a-Car', 'register', svc);
    });
};

module.exports = {
    registerForGateway
};