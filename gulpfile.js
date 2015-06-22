var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
supervisor = require( "gulp-supervisor" );

gulp.task('stylus', function() {
  gulp.src('public/css/stylus/*.styl')
    .pipe(stylus({compress: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('')
});

gulp.task("s", function() {
  supervisor("index.js", {
    exec: 'iojs',
    //watch: ['*.js']
  });
});

gulp.task('default', ['stylus']);