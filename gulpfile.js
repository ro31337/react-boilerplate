var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('server', function() {
  gulp
  .src('./src') // everything from ./src directory
  .pipe(server({ // pipe to server object
    livereload: true, // reload when files are changed
    open: true // and open the browser
  }));
});
