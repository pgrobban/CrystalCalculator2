/* eslint-disable */
var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');

// Lets bring es6 to es5 with this.
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up 
// into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify 
// handle es6 including imports.
// first we transpitle the code to ES5 and get one output file.
gulp.task('es6', function () {
  browserify({
    debug: true
  })
    .transform(babelify)
    .require("./app/app.js", {
      entry: true
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('dist/app.js'))
    .pipe(gulp.dest('./'));
});

// next we compress (minify) it
gulp.task('compress', function() {
  gulp.src('dist/app.js')
    .pipe(minify({
    }))
    .pipe(gulp.dest('./dist'))
});

// next, take SASS and transform it to CSS
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

// next minify the css
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.js', './data/**/*.json'], ['es6', 'compress']);
  gulp.watch(['./sass/**/*.scss'], ['sass', 'minify-css']);
});

gulp.task('default', ['sass', 'es6', 'watch', 'compress', 'minify-css']);