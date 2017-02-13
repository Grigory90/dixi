import del from 'del';

import cfg from '../config';

function clean() {

    return del([`${cfg.dirs.dist}/**`, `!${cfg.dirs.dist}`]);

}

export default clean;
