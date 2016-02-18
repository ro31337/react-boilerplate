var gulp = require('gulp');
var server = require('gulp-server-livereload');
var clean = require('gulp-rimraf');
var sequence = require('run-sequence');
var watch = require('gulp-watch');

gulp.task('build', function(callback) {
  sequence('clean', ['copy-html', 'browserify'], callback);
});

  // Clean dist folder
  gulp.task('clean', function() {
    return gulp.src('./dist', {
      read: false
    }).pipe(clean({
      force: true
    }));
  });

  // copy html files
  gulp.task('copy-html', function() {
    return gulp // note "return" keyword
      .src('./src/**/*.html') // copy everything, including subdirectories
      .pipe(gulp.dest('dist')); // to dist folder
  });

  // convert React components to be used in the browser
  gulp.task('browserify', function() {
    // nothing here for now
  });

gulp.task('watch', function() {
  // rebuild when jsx, js, html change, in src directory, including subdirectories
  watch('./src/**/*.{jsx,js,html}', function() {
    gulp.start('build');
  });
});

gulp.task('server', ['build'], function() {
  gulp.start('watch');
  gulp
  .src('./dist') // everything from ./dist directory
  .pipe(server({ // pipe to server object
    livereload: true, // reload when files are changed
    open: true // and open the browser
  }));
});
