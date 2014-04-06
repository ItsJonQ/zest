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
            files: ['src/**/*.js'],
            options: {
                strict: true,
                globals: {
                    console: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/**\n * Zest v<%= pkg.version %>\n * Copyright 2014. <%= pkg.author %>\n * <%= pkg.homepage %>\n' +
        ' * <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
            },
            script: {
                files: {
                    'zest.min.js': ['zest.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
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