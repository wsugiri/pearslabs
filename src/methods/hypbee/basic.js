const Hypercore = require('hypercore');
const Hyperbee = require('hyperbee');

exports.start = async () => {
    const core = new Hypercore('temp/basic-bee');
    const db = new Hyperbee(core, {
        keyEncoding: 'utf-8',
        valueEncoding: 'json',
    });

    await core.ready();

    await db.put('name', 'Hyperbee');
    await db.put('version', '1.0.0');
    await db.put('description', 'A simple key-value store.');
    await db.put('description', 'A simple key-value store. 2');
    await db.put('person1', { id: 1, name: 'satu' });

    console.log(core);
    await core.close();
};