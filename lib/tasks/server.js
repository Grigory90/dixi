const server = require('browser-sync').create();

const cfg = global.dixiConfig;

function initServer(done) {

    server.init(cfg.pluginOptions.browsersync, done);
}

function reloadServer(done) {

    server.reload();

    done();
}

function streamServer(emitter) {

    return server.stream.call(null, emitter);
}

module.exports = { initServer, reloadServer, streamServer };
