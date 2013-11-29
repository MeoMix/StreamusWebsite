/*jslint node: true */
//	A Gruntfile defines all of the configuration options necessary to run GruntJS against a given directory.
//	See here for more information: http://gruntjs.com/sample-gruntfile
'use strict';
//	TODO: Introduce a PNG/JPEG optimizer.
module.exports = function (grunt) {

	grunt.initConfig({

		//	Read in the project settings from the package.json file into the pkg property. This allows us to refer to the values of properties within our package.json.
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
		  files: ['Gruntfile.js', 'src/js/**/*.js'],
		  options: {
			// options here to override JSHint defaults
			globals: {
			  jQuery: true,
			  console: true,
			  module: true,
			  document: true
			},
			
			//	Don't validate third-party libraries.
			ignores: ['src/js/thirdParty/**/*.js']
		  }
		},
		
		concat: {
			options: {
				separator: ';',
				stripBanners: true
			},
			distjs: {
				src: ['src/js/**/!(chrome-api-vsdoc).js'],
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			distcss: {
				src: ['src/css/**/*.css'],
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			distjs: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['<%= concat.distjs.dest %>']
				}
			}
		},
	
		watch: {
		  files: ['<%= jshint.files %>'],
		  tasks: ['jshint']
		},
		
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
		
		cssmin: {
			minify: {
				src: 'dist/css/<%= pkg.name %>.css',
				dest: 'dist/css/<%= pkg.name %>.min.css',
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
	grunt.registerTask('lint', ['jshint']);

};