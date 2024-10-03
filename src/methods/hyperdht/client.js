const DHT = require('hyperdht');
const fs = require('node:fs');

const PUBLIC_KEY_FILE = 'publicKey';

if (!fs.existsSync(PUBLIC_KEY_FILE)) {
    console.error('Error: Public key file not found!');
    process.exit(1);
}

const serverPublicKey = fs.readFileSync(PUBLIC_KEY_FILE);

const dht = new DHT();

const socket = dht.connect(serverPublicKey);

socket.on('open', () => {
    console.log('Connected to server!');
    socket.write('Hello from the client!');


    setTimeout(() => {
        console.log('client disconnect');
        socket.end('Client disconnecting properly.');
    }, 3000);
});

socket.on('data', (data) => {
    if (data.toString()) {
        console.log('Received from server:', data.toString());
    } else {
        process.exit();
    }
});

socket.on('error', (err) => {
    console.error('Socket error:', err.message);
});

socket.on('close', () => {
    console.log('Connection closed.');
});