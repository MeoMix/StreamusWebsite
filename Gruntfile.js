/*jslint node: true*/
//  Provides methods which may be executed from the command prompt by being in this files cwd.
//  Type grunt to run the default method, or "grunt paramater" to run a specific method.
//
//  Options:
//      *   grunt: lint the website's non-third party code.
//      *   grunt production: copy and transform website files into a dist folder, ready to be deployed after.
//
//  See here for more information: http://gruntjs.com/sample-gruntfile
'use strict';
module.exports = function (grunt) {

    grunt.initConfig({

        //	Read project settings from package.json in order to be able to reference the properties with grunt.
        pkg: grunt.file.readJSON('package.json'),

        //  Tasks:

        //  Clean the distribution folder of previous files before every release.
        clean: ['dist'],

        //  Prepare CSS and JavaScript for deployment by combining into larger files.
        //  More options are applied by useminPrepare's evaluation of .html files
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                expand: true,
                cwd: 'dist',
                dest: 'dist/',
                src: ['**/*.html']
            }
        },

        //  Compress image sizes and move to dist folder
        imagemin: {
		
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dist/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                }]
            }

        },

        //  Improve code quality by applying a code-quality check with jshint
        jshint: {
            //  Files to analyze: 
            files: ['Gruntfile.js', 'src/js/**/*.js'],

            options: {
                //  Override JSHint defaults for the website
                globals: {
                    jQuery: true,
                    console: true
                },

                //	Don't validate third-party libraries
                ignores: ['src/js/thirdParty/**/*.js']
            }
        },

        requirejs: {
            production: {
                options: {
                    appDir: 'src',
                    dir: 'dist/',
                    //  Inlines the text for any text! dependencies, to avoid the separate
                    //  async XMLHttpRequest calls to load those dependencies.
                    inlineText: true,
                    stubModules: ['text'],
                    useStrict: true,
                    mainConfigFile: 'src/js/main.js',
                    //  List the modules that will be optimized. All their immediate and deep
                    //  dependencies will be included in the module's file when the build is done
                    modules: [{
                        name: 'main'
                    }, {
                        name: 'view/bodyView',
                        exclude: ['main']
                    }],
                    optimize: 'uglify2',
                    //  Skip CSS optimizations in RequireJS step -- handle with cssmin because it supports multiple CSS files.
                    optimizeCss: 'none',
                    paths: {
                        //  Paths fallbacks not supported in r.js so stub them with their fallbacks.
                        backbone: 'thirdParty/backbone',
                        bootstrap: 'thirdParty/bootstrap',
                        jquery: 'thirdParty/jquery',
                        lodash: 'thirdParty/lodash'
                    },
                    preserveLicenseComments: false,
                    //  Don't leave a copy of the file if it has been concatenated into a larger one.
                    removeCombined: true,
                    //  Skip files which start with a . or end in vs-doc.js as well as our CSS because cssmin is handling it
                    fileExclusionRegExp: /^\.|vsdoc.js$|.css$/
                    
                }
            }
        },

        useminPrepare: {
            //  Target src here so CSS can still be found.
            html: 'src/index.html'
        },

        usemin: {
            html: 'dist/index.html'
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //  Bulky, install on-demand only.
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('lint', ['jshint']);

	grunt.registerTask('production', ['lint', 'clean', 'requirejs', 'useminPrepare', 'usemin', 'concat', 'cssmin', 'htmlmin']);
	
};