const fs = require('fs');

const {cfg, pkg} = require('../helpers/config');

function manifest(done) {

    const data = {
        name: pkg.name,
        version: pkg.version,
        timestamp: process.env.timestamp
    };

    fs.writeFile(`${cfg.dirs.build}/build.json`, JSON.stringify(data, null, 2), 'utf8', done);
}

module.exports = manifest;
