const server = require('browser-sync').create();

const {cfg} = require('../helpers/config');

function init(done) {

    server.init(cfg.pluginOptions.browsersync, done);
}

function reload(done) {

    server.reload();
    done();
}

init.displayName = 'server';

module.exports = {init, reload, server};
