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
		
		useminPrepare: {
		    html: 'src/index.htm'
		},

		usemin: {
		    html: 'dist/index.htm'
		},

		copy: {
		    dist: {
		        files: [
                    { dest: 'dist/index.htm', src: 'src/index.htm' },
                    { dest: 'dist/share/', cwd: 'src/share', src: '**', expand: true},
		            { dest: 'dist/font/', cwd: 'src/font', src: '**', expand: true},
		            { dest: 'dist/img/', cwd:'src/img', src: '**', expand: true},
		            { dest: 'dist/favicon.ico', src: 'src/favicon.ico' },
		            { dest: 'dist/googlee6d26778f04ae1ed.html', src: 'src/googlee6d26778f04ae1ed.html' }
		        ]
		    }
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
	grunt.registerTask('lint', ['jshint']);

	//  TODO: I feel like I shouldn't have to call concat/uglify/cssmin here because useminPrepare's flow should handle it, but not seeing it...? 
	grunt.registerTask('gogo', ['copy', 'useminPrepare', 'usemin', 'concat', 'uglify', 'cssmin']);
	
};