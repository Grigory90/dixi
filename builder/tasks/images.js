import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';

import { browsersync } from './server';

import cfg from '../config';

function images() {

    let dest = `${cfg.dirs.build}/img`;
    let stream = gulp.src(`${cfg.dirs.src}/img/**/*.{svg,png,jpg,gif}`);

    if (!cfg.builder.prod) stream = stream.pipe(changed(dest));

    if (cfg.builder.prod) stream = stream.pipe(imagemin(...cfg.plugins.imagemin));

    return stream.pipe(gulp.dest(dest)).pipe(browsersync.stream());
}

export default images;
