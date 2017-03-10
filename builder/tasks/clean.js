import del from 'del';

import cfg from '../config';

function clean() {

    return del([`${cfg.dir.dist}/**`, `!${cfg.dir.dist}`]);

}

export default clean;
