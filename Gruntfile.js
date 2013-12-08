/*global module:false*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        root:'app/',
        typescript: {
            dist: {
                src: ['<%= root %>ts/**/*.ts'],
                dest: '<%= root %>js/',
                options: {
                    base_path: '<%= root %>ts/'
                }
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['<%= root %>js/*/**/*.js', '<%= root %>js/Application.js'],
                dest: '<%= root %>js/<%= pkg.name %>.js'
            }
        },
        /* uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= root %>js/<%= pkg.name %>.min.js'
            }
        }, */
        compass: {
            dist: {
                options: {
                    sassDir: '<%= root %>sass',
                    cssDir: '<%= root %>css',
                    /* environment: 'production' */
                }
            }
        },
        jade: {
            dist: {
                files: [
                    {
                        cwd: '<%= root %>jade/',
                        src: '**/*.jade',
                        dest: '<%= root %>',
                        expand: true,
                        ext: '.html'
                    }
                ]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            dist: {
                src: '<%= concat.dist.src %>'
            }
        },
        watch: {
            typescript: {
                files: ['<%= root %>ts/**/*.ts'],
                tasks: ['typescript', 'concat'/* , 'jshint:dist' *//* , 'uglify' */]
            },
            compass: {
                files: ['<%= root %>sass/**/*.scss'],
                tasks: ['compass']
            },
            jade: {
                files: ['<%= root %>jade/**/*.jade'],
                tasks: ['jade']
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['watch']);
};