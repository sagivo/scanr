module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      compile: {
        files: {
          'public/css/style.css': 'public/css/stylus/*.styl', // 1:1 compile
        }
      }
    },
    watch: {
      options: { livereload: true },
      stylus: {
        files: ['public/css/stylus/*.styl'],
        tasks: ['stylus']
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};