import helper from './helper';
import cfg from '../app/config';

const config = Object.assign(cfg, {
    builder: {
        prod: helper.argv('--prod') || false
    }
});

if (config.builder.prod) {
    config.dir.build = config.dir.dist;
    config.plugins.rollup.dest = `${config.dir.build}/js/main.js`;
}

export default config;
