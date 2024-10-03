const Hypercore = require('hypercore');

exports.start = async () => {
    const core = new Hypercore('temp/basic');

    await core.append(['Hello', 'World']);
    await core.append(['Hello', 'World']);
    await core.append(['1', 'Nilai 1']);
    await core.append(['1', '2', '3']);
    await core.append(JSON.stringify({ id: 1 }));
    await core.append(Buffer.from(JSON.stringify({ id: 1 })));
    await core.append(Buffer.from(JSON.stringify({ id: 2, text: 'Just Info 2' })));

    console.log(core);
    await core.close();
};