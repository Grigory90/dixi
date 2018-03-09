const gulp = require('gulp');
const bs = require('browser-sync');

const cfg = global.dixiConfig;
const server = bs.create();

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

gulp.task(initServer);
gulp.task(reloadServer);

module.exports = { initServer, reloadServer, streamServer };
