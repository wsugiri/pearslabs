const Hypercore = require('hypercore');

exports.start = async () => {
    const core = new Hypercore('temp/basic');

    let blok;

    blok = await core.get(40, { timeout: 5000 });
    console.log('--', blok.toString());

    blok = await core.get(41);
    console.log('--', blok.toString());

    blok = await core.get(63);
    console.log('--', blok.toString());

    blok = await core.get(64);
    console.log('--', blok.toString());

    let i = 0;
    while (blok) {
        blok = await core.get(i);
        console.log('--', i, blok.toString());
        i++;
    }

    await core.close();
};