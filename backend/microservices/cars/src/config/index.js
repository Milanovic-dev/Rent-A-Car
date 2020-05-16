let DB_URI = "mongodb://localhost:27017/microservices";

if (process.env.MONGO_DB_URI){
    DB_URI = process.env.MONGO_DB_URI;
}


const registerForGateway = () => {
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
                prefix: '/api/cars',
                port: 4000,
                address: ip
            };
            console.log(`Registering service with ip ${ip}`);
            pusher.trigger('XML-Rent-a-Car', 'register', svc);
        }).catch(err => console.error(err));
    
    process.on('SIGINT', () => {
        console.log('Deregistering service...');
    
        pusher.trigger('XML-Rent-a-Car', 'register', svc);
    });
};

module.exports = {
    DB_URI,
    registerForGateway
};