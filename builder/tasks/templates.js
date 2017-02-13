import fs from 'fs';
import gulp from 'gulp';
import twig from 'gulp-twig';

import cfg from '../config';

function templates() {

    const options = Object.assign(cfg.plugins.twig, {
        data: JSON.parse(fs.readFileSync(`${cfg.dirs.src}/html/data.json`, 'utf8'))
    });

    return gulp.src(`${cfg.dirs.src}/html/**/[^_]*.{html,twig}`)
        .pipe(twig(options))
        .pipe(gulp.dest(cfg.dirs.build));
}

export default templates;
