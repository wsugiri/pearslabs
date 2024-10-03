// writer.js
const Hypercore = require('hypercore');
const ram = require('random-access-memory');

// Create a new Hypercore instance with in-memory storage
const feed = new Hypercore(ram, { valueEncoding: 'utf-8' });

// Append data to the feed
feed.append('Hello, Hypercore!', (err) => {
    if (err) throw err;
    console.log('Data written to the feed.');

    // Get the feed's public key (discovery key)
    console.log('Feed key:', feed.key.toString('hex'));
});