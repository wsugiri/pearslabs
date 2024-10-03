const Hyperswarm = require('hyperswarm');
const crypto = require('node:crypto');
const fs = require('node:fs');

const TOPIC_FILE = 'topicID';

if (!fs.existsSync(TOPIC_FILE)) {
    console.error('Error: TOPIC file not found!');
    process.exit(1);
}

const topic = fs.readFileSync(TOPIC_FILE);

const swarm = new Hyperswarm();

swarm.join(topic, {
    announce: false, // Not announcing, just looking for servers
    lookup: true,    // Actively look for servers
});

// When we find a peer, connect to it
swarm.on('connection', (socket, info) => {
    console.log('Connected to server:', info);

    // Send a message to the server
    socket.write('Hello from the client!');

    // Listen for data from the server
    socket.on('data', (data) => {
        console.log('Received from server:', data.toString());

        setTimeout(() => {
            console.log('client disconnect');
            socket.end('Client disconnecting properly.');
            process.exit();
        }, 3000);
    });
});

console.log('Client is looking for servers...');