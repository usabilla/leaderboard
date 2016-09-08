const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const stringify = require('stringify');
const tsify = require('tsify');
const watchify = require('watchify');
const del = require('del');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const argv = require('yargs').argv;
const runSequence = require('run-sequence');
const _assign = require('lodash/assign');

const paths = {
  dist: 'dist',
  module: 'src/js/module.ts',
  scripts: 'src/js/**/*.ts',
  partials: 'src/partials/**/*.html',
  styles: 'src/scss/**/*.scss',
  images: 'src/images/**/*',
  index: 'src/index.html',
  fonts: 'src/fonts/**/*',
  sounds: 'src/sounds/**/*'
};

const customOptions = {
  entries: paths.module,
  debug: true
};
const options = _assign({}, watchify.args, customOptions);
const sources = watchify(browserify(options).transform(stringify, {
  appliesTo: {includeExtensions: ['.html']},
  minify: true
}));
sources.plugin(tsify);

sources.on('update', bundle);
sources.on('log', $.util.log);

gulp.task('scripts', bundle);

function bundle () {
  return sources
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe($.ngAnnotate())
    .pipe($.if(argv.prod, $.uglify()))
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
}

gulp.task('clean', function () {
  return del(['dist/*']);
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('sass', function () {
  return $.rubySass(paths.styles, {style: 'compact'})
    .pipe($.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe($.if(argv.prod, $.cleanCss()))
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

gulp.task('build', function (callback) {
  runSequence(
    'clean', [
      'scripts',
      'sass',
      'images',
      'fonts',
      'sounds',
      'index'
    ],
    callback);
});

gulp.task('default', [
  'scripts',
  'sass',
  'images',
  'fonts',
  'sounds',
  'index',
  'watch'
]);
