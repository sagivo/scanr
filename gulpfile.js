var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

gulp.task('stylus', function() {
  gulp.src('public/css/stylus/*.styl')
    .pipe(stylus({compress: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('default', ['stylus']);