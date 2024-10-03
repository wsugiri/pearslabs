(async () => {
    const testMethod = process.argv[2];
    if (!testMethod) {
        console.log('no test parameter', '\n');
        return;
    }

    const dateStart = Date.now();
    let resp;

    switch (testMethod) {
        case 'hello':
            console.log('hello');
            break;
        case 'dht-server':
            require('../src/methods/hyperdht/server');
            break;
        case 'dht-client':
            require('../src/methods/hyperdht/client');
            break;
        case 'hyp-server':
            require('../src/methods/hyswarm/server');
            break;
        case 'hyp-client':
            require('../src/methods/hyswarm/client');
            break;
        case 'core-basic':
            await require('../src/methods/hycore/basic').start();
            break;
        case 'core-basic-read':
            await require('../src/methods/hycore/basic_reader').start();
            break;
        case 'bee-basic':
            await require('../src/methods/hypbee/basic').start();
            break;
        case 'bee-basic-read':
            await require('../src/methods/hypbee/basic-reader').start();
            break;
        default:
            break;
    }

    const duration = Date.now() - dateStart;

    if (resp) console.log(resp);
    console.log('-- duration --', duration);
})();
