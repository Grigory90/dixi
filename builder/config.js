import helper from './helper';
import cfg from '../app/config';

const config = Object.assign(cfg, {
    builder: {
        prod: helper.argv('--prod') || false
    }
});

export default config;
