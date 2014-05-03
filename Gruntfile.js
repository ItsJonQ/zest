module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
        ' * Zest\n' +
        ' * A light-weight DOM library\n' +
        ' * v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
        ' */\n\n',

        browserify: {
            tests: {
                files: {
                    'test/tests.js': ['test/build/**/*.js'],
                }
            }
        },

        concat: {
            options: {
              banner: '<%= banner %>',
              separator: '\n\n',
            },
            dist: {
                src: ['src/zest.js'],
                dest: 'dist/zest.js'
            },
            tests: {
                src: [
                    'test/units/setup.js',
                    'test/units/pretest.js',
                    'test/units/selectors.js',
                    'test/units/classes.js'
                ],
                dest: 'test/tests.js'
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

        qunit: {
            files: ['test/**/*.html']
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            script: {
                files: {
                    'dist/zest.min.js': ['src/zest.js']
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            tests: {
                files: ['test/**/*.js'],
                tasks: ['concat:tests', 'qunit']
            }
        }

    });

    // Load plugins here
    // grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Define your tasks here
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

    // Build
    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

    // Test
    grunt.registerTask('test', ['concat:tests', 'qunit']);

    // Watch
    grunt.registerTask('spy', ['watch']);

};