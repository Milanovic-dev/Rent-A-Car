const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
const domain = process.env.DOMAIN || `localhost:${port}`;

const proxy = require('redbird')({port: port});
const Pusher = require('pusher-js');

const pusherSocket = new Pusher(process.env.PUSHER_KEY, {
    forceTLS: true,
    cluster: process.env.PUSHER_CLUSTER,
  });

  const channel = pusherSocket.subscribe('XML-Rent-a-Car');

  channel.bind('register', data => {
    proxy.register(
      `${domain}${data.prefix}`,
      `http://${data.address}:${data.port}`
    );
  });

  channel.bind('exit', data => {
    proxy.unregister(
      `${domain}${data.prefix}`,
      `http://${data.address}:${data.port}`
    );
  });