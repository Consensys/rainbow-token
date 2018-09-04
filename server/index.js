'use strict';

const app = require('./app');

const PORT = 3000;

process.on('SIGTERM', function() {
    process.exit()
})

process.on('SIGINT', function() {
    process.exit();
});

app.listen(PORT);
