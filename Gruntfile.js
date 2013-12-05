/*jslint node: true*/
//  Provides methods which may be executed from the command prompt by being in this files cwd.
//  Type grunt to run the default method, or "grunt paramater" to run a specific method.
//
//  Options:
//      *   grunt: lint the website's non-third party code and begin watching for changes.
//      *   grunt release: copy and transform website files into a dist folder, ready to be deployed after.
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
        //  More options are applied by useminPrepare's evaluation of .htm files
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            }
        },

        //  Copy all files intended for release to the dist folder. Maintain the same file hierarchy.
        copy: {
            dist: {
                files: [
					{ dest: 'dist/index.htm', src: 'src/index.htm' },
					//	TODO: I still only kind of understand expand... it fixes a lot of stuff though.
					//	More here: http://stackoverflow.com/questions/16977884/what-does-the-expand-option-do-in-grunt-contrib-copy-the-examples-all-use-it
					{ dest: 'dist/share/', cwd: 'src/share', src: '**', expand: true},
					{ dest: 'dist/font/', cwd: 'src/font', src: '**', expand: true},
					{ dest: 'dist/img/', cwd: 'src/img', src: '**', expand: true },
                    { dest: 'dist/template/', cwd: 'src/template', src: '**', expand: true },
					{ dest: 'dist/favicon.ico', src: 'src/favicon.ico' },
					{ dest: 'dist/googlee6d26778f04ae1ed.html', src: 'src/googlee6d26778f04ae1ed.html' }
                ]
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
                src: ['**/*.htm']
            }
        },

        //  Compress image sizes and move to dist folder
        imagemin: {
		
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
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
                    //  - "standard": @import inlining, comment removal and line returns.
                    //  Removing line returns may have problems in IE, depending on the type of CSS.
                    optimizeCss: 'standard',
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
                    //  Skip files which start with a . or end in vs-doc.js
                    fileExclusionRegExp: /^\.|vsdoc.js$/
                    
                }
            }
        },

        useminPrepare: {
            html: 'src/index.htm'
        },

        usemin: {
            html: 'dist/index.htm'
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //	TODO: Introduce a PNG/JPEG optimizer. It was throwing a fatal error on PNGs (known issue) waiting for fix to go public.
    //  See here for more information: https://github.com/gruntjs/grunt-contrib-imagemin/issues/61
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('default', ['jshint', 'watch']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('production', ['clean', 'requirejs', 'htmlmin']);

	//	TODO: I feel like I shouldn't have to call concat/uglify/cssmin here because useminPrepare's flow property should handle it by default... but not seeing it so I call 'em manually.
	//	Generate a release build in the dist folder.
	grunt.registerTask('release', ['clean', 'copy', 'useminPrepare', 'usemin', 'concat', 'cssmin', 'htmlmin', 'requirejs']);
	
};