/* eslint-disable */
var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

// Lets bring es6 to es5 with this.
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up 
// into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify 
// handle es6 including imports.
gulp.task('es6', function() {
    browserify({
            debug: true
        })
        .transform(babelify)
        .require("./app/app.js", {
            entry: true
        })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('compiled-js/app.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch(['./app/**/*.js', './data/**/*.json'], ['es6']);
});

gulp.task('default', ['es6', 'watch']);