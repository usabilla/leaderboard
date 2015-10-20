var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var addStream = require('add-stream');
var browserify = require('browserify');
var del = require('del');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var paths = {
  dist: 'dist',
  module: 'src/js/module.js',
  scripts: 'src/js/**/*.js',
  partials: 'src/partials/**/*.html',
  styles: 'src/scss/**/*.scss',
  vendor: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/build/angular-ui-router.min.js',
    'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-timer/dist/angular-timer.min.js',
    'node_modules/humanize-duration/humanize-duration.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/angular-hotkeys/build/hotkeys.min.js',
    'node_modules/angucomplete-alt/dist/angucomplete-alt.min.js',
    'bower_components/angular-audio/app/angular.audio.js'
  ],
  images: 'src/images/**/*',
  index: 'src/index.html',
  fonts: 'src/fonts/**/*',
  sounds: 'src/sounds/**/*'
};

function templates () {
  return gulp.src(paths.partials)
    .pipe($.angularTemplatecache());
}

gulp.task('clean', function () {
  return del(['dist/*']);
});

gulp.task('scripts', function () {
  return browserify(paths.module)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.ngAnnotate())
    .pipe(addStream.obj(templates()))
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('vendor', function () {
  return gulp.src(paths.vendor)
      .pipe($.concat('vendor.min.js'))
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
    .pipe($.concat('style.css'))
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

gulp.task('webserver', ['images', 'sounds'], function () {
  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.vendor, ['vendor']);
  gulp.watch(paths.partials, ['scripts']);
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('build', [
  'clean',
  'scripts',
  'vendor',
  'sass',
  'images',
  'fonts',
  'sounds',
  'index'
]);

gulp.task('default', [
  'scripts',
  'vendor',
  'sass',
  'images',
  'fonts',
  'sounds',
  'index',
  'watch',
  'webserver'
]);
