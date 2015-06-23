const STYLUS_FILES = 'public/css/stylus/*.styl'
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
supervisor = require( "gulp-supervisor" );

gulp.task('stylus', function() {
  gulp.src(STYLUS_FILES)
    .pipe(stylus({compress: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css/'))
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(STYLUS_FILES, ['stylus']);
  gulp.watch(STYLUS_FILES, livereload);
  gulp.watch(['app/views/*.html', 'app/views/*.ejs'], livereload);
  gulp.watch('public/css', livereload);
});

gulp.task("s", function() {
  supervisor("index.js", {
    exec: 'iojs'
  });
});

gulp.task('default', ['s', 'watch']);
