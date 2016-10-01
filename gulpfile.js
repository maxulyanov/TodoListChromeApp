/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 22:53
 */



'use strict';


// Modules
const browserify = require('browserify');
const babelify = require('babelify');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cache = require('gulp-cached');
const debug = require('gulp-debug');
const less = require('gulp-less');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat')
const del = require('del');
const stream = require('vinyl-source-stream');
;


// DEV
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


// Source folders
const source = {
    js: './src/js/',
    styles: './src/styles/',
    img: './src/img/',
    icons: './src/icons/',
    fonts: './src/fonts/'
}


// Patterns files
const patterns = {
    js: source.js + '/**/*.js',
    styles: source.styles + '*.less',
    img: source.img + '*.*',
    icons: source.icons + '*.*',
    fonts: source.fonts + '*.*'
};


// Build
const build = {
    folder: './build/',
    names: {
        js: 'build.js',
        styles: 'build.css'
    }
}


// Styles
gulp.task('build:styles', function () {
    return gulp.src(patterns.styles) // {since: gulp.lastRun('build:styles')
        // .pipe(cache('less'))
        .pipe(less())
        .pipe(gulpIf(isDevelopment, debug({title: 'less -> css'})))
        .pipe(autoprefixer())
        .pipe(concat(build.names.styles))
        .pipe(gulp.dest(build.folder))
});


// JS
gulp.task('build:js', function () {
    return browserify({
        entries: source.js + 'app.js'
    })
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(stream(build.names.js))
        .pipe(gulp.dest(build.folder));
});


// img
gulp.task('build:img', function () {
    return gulp.src([patterns.img])
        .pipe(gulp.dest(build.folder + 'img'))
});


// icons
gulp.task('build:icons', function () {
    return gulp.src([patterns.icons])
        .pipe(gulp.dest(build.folder + 'icons'))
});


// Fonts
gulp.task('build:fonts', function () {
    return gulp.src([patterns.fonts])
        .pipe(gulp.dest(build.folder + 'fonts'))
});


// Clear
gulp.task('build:clean', function () {
    return del([build.folder + '/*.*']);
});


// Main build
gulp.task('build',
    gulp.series(
        'build:clean',
        'build:js',
        'build:styles',
        'build:icons',
        'build:img',
        'build:fonts'
    ));


// Watch
gulp.task('watch', function () {
    gulp.watch(patterns.styles, gulp.series('build:styles'));
    gulp.watch(patterns.js, gulp.series('build:js'));
});


// Development
gulp.task('dev',
    gulp.series('build', gulp.parallel('watch'))
);
