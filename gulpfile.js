var gulp = require('gulp');
var angularTemplateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var addStream = require('add-stream');
var browserify = require('browserify');
var del = require('del');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var paths = {
  module: 'src/module.js',
  scripts: 'src/**/*.js',
  partials: 'src/partials/**/*.html',
  vendor: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/build/angular-ui-router.min.js',
    'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-timer/dist/angular-timer.min.js',
    'node_modules/humanize-duration/humanize-duration.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/angular-hotkeys/build/hotkeys.min.js',
    'node_modules/angucomplete-alt/dist/angucomplete-alt.min.js'
  ],
  images: 'images/**/*'
};

function templates () {
  return gulp.src(paths.partials)
    .pipe(angularTemplateCache());
}

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('scripts', ['clean'], function() {
  return browserify(paths.module)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ngAnnotate())
    .pipe(addStream.obj(templates()))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor', ['clean'], function() {
  return gulp.src(paths.vendor)
      .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'vendor']);
  gulp.watch(paths.partials, ['scripts', 'vendor']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'scripts', 'vendor', 'images']);
