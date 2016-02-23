var gulp = require('gulp');
var server = require('gulp-server-livereload');
var clean = require('gulp-rimraf');
var sequence = require('run-sequence');
var watch = require('gulp-watch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

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
    var babelifyConfig = babelify.configure({presets: ['es2015', 'react'], extensions: ['.jsx']});

    return browserify({
        entries: 'src/app.jsx', // the same as "--extension=.jsx src/**/*.jsx"
        extensions: ['.jsx']
      })
      .transform(babelifyConfig) // the same as -t command line parameter
      .bundle() // "readable stream with the javascript file contents"
      .pipe(source('bundle.js')) // "conventional text stream at the start of our gulp pipeline", wrapped with "pipe" method
      .pipe(gulp.dest('dist')); // standard gulp way to redirect gulp pipe to directory
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
