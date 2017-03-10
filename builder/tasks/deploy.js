import fs from 'fs';
import gulp from 'gulp';
import ftp from 'vinyl-ftp';

import helper from '../helper';
import cfg from '../config';

function deploy(done) {

    const file = './.ftp';

    if (!fs.existsSync(file)) {
        console.log(helper.msg('.ftp file not found, this task will be skipped'));
        return done();
    }

    const options = Object.assign(JSON.parse(fs.readFileSync(file, 'utf8')), cfg.plugins.ftp);
    const connect = ftp.create(options);

    return gulp.src(`${cfg.dir.dist}/**`, {base: cfg.dir.dist, buffer: false})
        .pipe(connect.dest(`./${cfg.app.name}`));
}

export default deploy;
