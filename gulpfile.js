/* eslint-disable */
var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');

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

// annotate and minify it
gulp.task('compress', function () {
  return gulp.src('dist/app.js')
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(minify({}))
    .pipe(sourcemaps.write('./dist'))
    .pipe(gulp.dest('./dist'));
});

// next, take SASS and transform it to CSS
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

// next minify the css
gulp.task('minify-css', function () {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.js', './data/**/*.json'], ['es6', 'compress']);
  gulp.watch(['./sass/**/*.scss'], ['sass', 'minify-css']);
});

gulp.task('default', ['sass', 'es6', 'compress', 'minify-css', 'watch']);