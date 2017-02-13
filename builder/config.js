import helper from './helper';
import cfg from '../app/config';

const config = Object.assign(cfg, {
    builder: {
        prod: helper.argv('--prod') || false
    }
});

if (config.builder.prod) {
    config.dirs.build = config.dirs.dist;
    config.plugins.rollup.dest = `${config.dirs.build}/js/main.js`;
}

export default config;
