const gulp = require('gulp');

const vendor = require('./tasks/vendor.js');
const bundle = require('./tasks/bundle.js');

gulp.task('vendor:prod', vendor.prod);
gulp.task('vendor:dev', vendor.dev);

gulp.task('bundle:prod', bundle.prod);
gulp.task('bundle:dev', bundle.dev);

gulp.task('build:prod', gulp.series([
    'vendor:prod',
    'bundle:prod'
]));

gulp.task('build:dev', gulp.series([
    'vendor:dev',
    'bundle:dev'
]));

