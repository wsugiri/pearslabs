const Hyperswarm = require('hyperswarm');
const crypto = require('node:crypto');
const fs = require('node:fs');

const TOPIC_FILE = 'topicID';
let topic;
let counter = 0;

if (fs.existsSync(TOPIC_FILE)) {
    topic = fs.readFileSync(TOPIC_FILE);
} else {
    topic = crypto.createHash('sha256').update('topic11').digest();
    fs.writeFileSync(TOPIC_FILE, topic);
}

const swarm = new Hyperswarm();

// Announce this server on the DHT so peers can discover it
swarm.join(topic, {
    announce: true, // Announce as a server
    lookup: false,  // No need to look for other peers
});


// Listen for incoming connections from peers
swarm.on('connection', (peer, info) => {
    // console.log('New peer connected:', info);

    // Listen for data from the peer
    peer.on('data', (data) => {
        counter++;
        console.log(info.publicKey.toString('hex').substring(0, 6), ':', data.toString());
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

console.log('Server is waiting for connections...');
