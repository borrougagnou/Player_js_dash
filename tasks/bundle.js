const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

const vendors = require('./_vendors');

const browserifyOptions = {
    entries: ['./src/index.js'],
    basedir: '.',
    paths: ['src'],
    debug: true
}

function prod() {
    return browserify(browserifyOptions)
        .external(vendors)
        .transform('babelify', { presets: ['@babel/preset-env'], extensions: ['.js'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
};

function dev() {
    return browserify(browserifyOptions)
        .external(vendors)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
};

module.exports = { prod, dev };
