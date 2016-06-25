var gulp = require('gulp'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

gulp.task('watch', function () {
	gulp.watch(['./public/js/*.js', './index.html'], function () {
    livereload.reload();
  });
});


gulp.task('scripts', function() {
  return gulp.src(['./browser/js/*.js', '/browser/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('default', ['scripts', 'watch']);
