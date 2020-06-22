'use strict';

const net = require('net');
const chatServer = net.createServer();
const clientList = [];

const broadcast = (message, client) => {
    // for (let i = clientList.length - 1; i >= 0; i--) {
    //     if (client !== clientList[i]) {
    //         clientList[i].write(message);
    //     }
    // }

    clientList.map((actualClient) => { if (client !== actualClient) actualClient.write(message); });
};

chatServer.on('connection', (client) => {
    client.write('Hi guest' + '!\n');
    clientList.push(client);

    client.on('data', (data) => {
        broadcast(data, client);
    });

    client.on('end', () => {
        console.log('client', clientList.indexOf(client));
        client.splice(clientList.indexOf(client), 1);
    });

    client.on('error', (err) => {
        console.log(err);
    });
});

chatServer.listen(9000);