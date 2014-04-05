module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/zest.js'],
                dest: 'zest.js'
            }
        },
        jshint: {
            files: ['src'],
            options: {
                strict: true,
                globals: {
                    console: true
                }
            }
        },
        uglify: {
            script: {
                files: {
                    'zest.min.js': ['zest.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src'],
                tasks: ['jshint', 'concat']
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Define your tasks here
    grunt.registerTask('default', ['jshint', 'concat', 'watch']);

    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

};