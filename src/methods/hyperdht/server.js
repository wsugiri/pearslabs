const DHT = require('hyperdht');
const crypto = require('node:crypto');
const fs = require('node:fs');

const PRIVATE_KEY_FILE = 'privateKey';
const PUBLIC_KEY_FILE = 'publicKey';

let keyPair;
let counter = 0;

if (fs.existsSync(PRIVATE_KEY_FILE) && fs.existsSync(PUBLIC_KEY_FILE)) {
    const privateKey = fs.readFileSync(PRIVATE_KEY_FILE);
    const publicKey = fs.readFileSync(PUBLIC_KEY_FILE);
    keyPair = { publicKey, secretKey: privateKey };
} else {
    keyPair = DHT.keyPair(crypto.randomBytes(32));

    fs.writeFileSync(PRIVATE_KEY_FILE, keyPair.secretKey);
    fs.writeFileSync(PUBLIC_KEY_FILE, keyPair.publicKey);
    console.log('New keys generated and saved to file.');
}

const dht = new DHT();

const server = dht.createServer((peer) => {
    console.log('New connection established!');

    peer.on('data', (data) => {
        console.log(peer.publicKey.toString('hex').substring(0, 6), ':', data.toString());

        counter++;
        peer.write('Hello from the server! ' + counter);
    });

    // Handle client disconnection gracefully
    peer.on('end', () => {
        console.log('Client disconnected (end event)');
    });

    // Handle any errors (e.g., client disconnecting unexpectedly)
    peer.on('error', (err) => {
        console.error('peer error:', err.message);
    });

    // Handle peer closure
    peer.on('close', () => {
        console.log('Connection closed by the client.');
    });
});

server.listen(keyPair);

console.log('Server is listening. Public key (for client):', keyPair.publicKey.toString('hex'));
