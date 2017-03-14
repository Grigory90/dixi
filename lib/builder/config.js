const fs = require('fs');
const path = require('path');

const helper = require('./helper');

const configFile = path.resolve(process.cwd(), './dixi.config.js');
const pkgFile = path.resolve(process.cwd(), './package.json');

if (!fs.existsSync(configFile)) {
    helper.msg(`Config file not found, run "dixi init" before.`);
    process.exit(1);
}

const cfg = require(configFile);

if (process.env.isProduction) {
    cfg.dirs.dev = cfg.dirs.build;
}

if (fs.existsSync(pkgFile)) {
    cfg.pkg = require(pkgFile);
}

module.exports = cfg;
