const Hypercore = require('hypercore');
const Hyperbee = require('hyperbee');

exports.start = async () => {
    const core = new Hypercore('temp/basic-bee');
    // const db = new Hyperbee(core);
    const db = new Hyperbee(core, {
        keyEncoding: 'utf-8',
        valueEncoding: 'json',
    });

    await core.ready();

    // await db.put('name', 'Hyperbee');
    // await db.put('version', '1.0.0');
    // await db.put('description', 'A simple key-value store.');
    // await db.put('description', 'A simple key-value store. 2');

    let block;

    block = await db.get('description');
    console.log(block);

    block = await db.get('person1');
    console.log(block);

    await core.close();
};