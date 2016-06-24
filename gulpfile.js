var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('watch', function () {
	gulp.watch(['./public/js/*.js', './index.html'], function () {
    reload();
  });
});

gulp.task('scripts', function() {
  return gulp.src(['./public/js/myScript.js', './public/js/keyboard.js', './public/js/mouse.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('default', ['scripts', 'watch']);
