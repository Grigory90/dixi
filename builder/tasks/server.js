import bs from 'browser-sync';

import cfg from '../config';

const browsersync = bs.create(`${cfg.app.name} server`);

function reload(done) {

    browsersync.reload();
    done();
}

function server(done) {

    browsersync.init(cfg.plugins.browsersync, done);
}

export { server, browsersync, reload };
