module.exports = {
    norpc: false, // !process.env.CI TODO: should be restored when testrpc-sc works in docker again
    testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',
    compileCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle compile',
    skipFiles: [
        'mocks',
        'lifecycle/Migrations.sol'
    ]
}
