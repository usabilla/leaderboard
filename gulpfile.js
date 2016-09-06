var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var stringify = require('stringify');
var del = require('del');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var argv = require('yargs').argv;

var paths = {
  dist: 'dist',
  module: 'src/js/module.js',
  scripts: 'src/js/**/*.js',
  partials: 'src/partials/**/*.html',
  styles: 'src/scss/**/*.scss',
  images: 'src/images/**/*',
  index: 'src/index.html',
  fonts: 'src/fonts/**/*',
  sounds: 'src/sounds/**/*'
};

gulp.task('clean', function () {
  return del(['dist/*']);
});

gulp.task('scripts', function () {
  return browserify(paths.module)
    .transform(stringify, {
      appliesTo: {includeExtensions: ['.html']},
      minify: true
    })
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe($.ngAnnotate())
    .pipe($.if(argv.prod, $.uglify()))
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('sass', function () {
  return $.rubySass(paths.styles, {style: 'compact'})
    .pipe($.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe($.if(argv.prod, $.minifyCss()))
    .pipe($.concat('style.min.css'))
    .on('error', $.rubySass.logError)
    .pipe(gulp.dest(paths.dist + '/styles'));
});

gulp.task('index', function () {
  return gulp.src(paths.index)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('sounds', function () {
  return gulp.src(paths.sounds)
    .pipe(gulp.dest(paths.dist + '/sounds'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.partials, ['scripts']);
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('build', [
  'clean',
  'scripts',
  'sass',
  'images',
  'fonts',
  'sounds',
  'index'
]);

gulp.task('default', [
  'scripts',
  'sass',
  'images',
  'fonts',
  'sounds',
  'index',
  'watch'
]);
