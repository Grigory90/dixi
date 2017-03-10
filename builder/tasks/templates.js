import fs from 'fs';
import gulp from 'gulp';
import twig from 'gulp-twig';

import cfg from '../config';

function templates() {

    const options = Object.assign(cfg.plugins.twig, {
        data: JSON.parse(fs.readFileSync(`${cfg.dir.src}/html/data.json`, 'utf8'))
    });

    return gulp.src(`${cfg.dir.src}/html/**/[^_]*.{html,twig}`)
        .pipe(twig(options))
        .pipe(gulp.dest(cfg.dir.build));
}

export default templates;
