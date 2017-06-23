const fs = require('fs');

const cfg = require('../helpers/config');

function manifest(done) {

    const data = {
        name: cfg.pkg.name,
        version: cfg.pkg.version,
        timestamp: new Date()
    };

    fs.writeFile(`${cfg.dirs.build}/build.json`, JSON.stringify(data, null, 2), 'utf8', done);
}

module.exports = manifest;
