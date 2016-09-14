const gulp = require('gulp');
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const ngAnnotate = require('browserify-ngannotate');
const buffer = require('vinyl-buffer');

gulp.task('build-js', () => {
  const b = browserify({
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

gulp.task('build-css', () =>
  gulp.src('./sass/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('clean', () => del(['./dist']));

gulp.task('build', ['clean', 'build-css', 'build-js'], () => { });

gulp.task('watch', () => {
  gulp.watch(['./app/**/*.js', './data/**/*.json'], ['build-js']);
  gulp.watch(['./sass/**/*.scss'], ['build-css']);
});

gulp.task('default', ['clean', 'build', 'watch']);
