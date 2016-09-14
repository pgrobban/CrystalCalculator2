/* eslint-disable */
var gulp = require('gulp');
var del = require('del');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var ngAnnotate = require('browserify-ngannotate');
var buffer = require('vinyl-buffer')

gulp.task('build-js', ['clean'], function () {
  var b = browserify({
    entries: './app/app.js',
    debug: true,
    paths: [],
    transform: [babelify, ngAnnotate]
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-css', ['clean'], function () {
  return gulp.src('./sass/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return del(['./dist']);
});

gulp.task('build', [ 'clean', 'build-css', 'build-js'], function() {  
  return;
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.js', './data/**/*.json'], ['build-js']);
  gulp.watch(['./sass/**/*.scss'], ['build-css']);
});

gulp.task('default', ['build', 'watch']);