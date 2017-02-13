import { rollup } from 'rollup';
import rollupUglify from 'rollup-plugin-uglify';

import cfg from '../config';

function scripts() {

    if (cfg.builder.prod) cfg.plugins.rollup.plugins.push(rollupUglify());

    return rollup(cfg.plugins.rollup).then(bundle => bundle.write(cfg.plugins.rollup));
}

export default scripts;
