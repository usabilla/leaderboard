var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');

var paths = {
  scripts: 'src/**/*.js',
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

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    // .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor', ['clean'], function() {
  return gulp.src(paths.vendor)
    // .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('vendor.min.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'scripts', 'vendor', 'images']);
