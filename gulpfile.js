var paths = {
  stylus: 'public/css/stylus/**/*.styl',
  front: ['app/views/**/*.{html,ejs}','public/js/**/*.js'],
  supervisor: ['app/controllers', 'app/models', 'index.js', 'config']
}

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var supervisor = require( "gulp-supervisor" );

gulp.task('stylus', function() {
  gulp.src(paths.stylus)
    .pipe(stylus({compress: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css/'))
    .pipe(livereload());
});

gulp.task('reload_page', function() {
  livereload.reload();
});

gulp.task('watch', function() {
  livereload.listen(); //comment if you don't want livereload
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.front, ['reload_page'])
});

gulp.task("s", function() {
  supervisor("index.js", {
    exec: 'node',
    watch: paths.supervisor
  });
});

gulp.task('default', ['s', 'watch']);