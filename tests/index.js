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
            require('../src/methods/hyperdht/client');
            break;
        default:
            break;
    }

    const duration = Date.now() - dateStart;

    if (resp) console.log(resp);
    console.log('-- duration --', duration);
})();
