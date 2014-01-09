var JSON5 = require('json5');

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		SRC_PATH: './src/',
		BUILD_PATH: './target/',

		/**
		 * Used to remove files or directories
		 */
		clean: {
			target: ['<%= BUILD_PATH %>'], //build files
		},

		/**
		 * Used to copy files or directories
		 */
		copy: {
			target: {
				files: [{ // Copy source into build folder for further manipulation
					expand: true,
					cwd: '<%= SRC_PATH %>',
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}]
			}
		},

		/**
		 * Used to minify css files, and takes any @import references and concats the into that same file
		 */
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= SRC_PATH %>' + 'css/',
					src: ['*.css'],
					dest: '<%= BUILD_PATH %>' + 'css/'
				}]
			}
		},

		/**
		 * Used to minify javascript files or directories.
		 * By not specifying a destination directory, it will overwrite the source file
		 */
		uglify: {
			target: {
				files: [{
					expand: true,
					src: '<%= BUILD_PATH %>' + 'js/**/*.js'
				}]
			}
		},

		/**
		 * The RequireJS plugin that will use uglify2 to build and minify our
		 * JavaScript, templates and any other data we include in the require files.
		 */
		requirejs: {
			compile: {
				options: JSON5.parse(grunt.file.read('require-build-config.json'))
			}
		},

		// Pre-compilation of templates
		jst: {
			compile: {
				options: {
					templateSettings: {
						//these MUST match the settings in core.js
						interpolate: /{{=([\s\S]+?)}}/g,
						evaluate: /{{([\s\S]+?)}}/g,
						escape: /{{-([\s\S]+?)}}/g
					}
				},
				files: {
					'<%= BUILD_PATH %>html/compiled.js': ['<%= SRC_PATH %>' + 'html/**/*.html']
				}
			}
		},

		// Code formatting configuration
		jsbeautifier: {
			modify: {
				src: ['Gruntfile.js', '<%= SRC_PATH %>' + '**/*.js', '!<%= SRC_PATH %>' + 'lib/**/*.js'], //exclude lib directory
				options: {
					config: '.jsbeautifyrc'
				}
			},
			verify: {
				src: ['Gruntfile.js', '<%= SRC_PATH %>' + '**/*.js', '!<%= SRC_PATH %>' + 'lib/**/*.js'],
				options: {
					mode: 'VERIFY_ONLY',
					config: '.jsbeautifyrc'
				}
			}
		},

		/**
		 * Code quality check configuration
		 */
		jshint: {
			all: ['<%= SRC_PATH %>' + '**/*.js'],
			options: {
				reporter: 'jslint',
				reporterOutput: 'hintresults.xml',
				force: false, //to not fail the task if errors are encoutered
				jshintrc: '.jshintrc',
				ignores: [
					'<%= SRC_PATH %>' + 'lib/**/*.js'
				]
			}
		},

		/**
		 * Unit testing configuration
		 */
		karma: {
			options: {
				configFile: './test/karma.config.js',
				// browsers: [
				//     'Chrome',
				//     'Firefox'
				//      'IE'
				//      'Safari'
				//      'PhantomJS'
				// 	]

			},
			validateWindows: {
				browsers: ['Chrome', 'Firefox', 'IE'],
				singleRun: true
			},
			validateMac: {
				browsers: ['Safari', 'Chrome', 'Firefox'],
				singleRun: true
			},
			windowsDev: {
				browsers: ['Chrome', 'Firefox', 'IE'],
				autoWatch: true
			},
			macDev: {
				browsers: ['Safari', 'Chrome', 'Firefox'],
				autoWatch: true
			}
		},

		/**
		 * Auto documentation of your source code
		 */
		docker: {
			app: {
				expand: true,
				src: ['<%= SRC_PATH %>' + '**/*.js', '<%= SRC_PATH %>' + '**/*.css', '<%= SRC_PATH %>' + '**/*.html'],
				dest: 'doc',
				options: {
					onlyUpdated: false,
					colourScheme: 'default',
					ignoreHidden: false,
					sidebarState: true,
					exclude: '<%= SRC_PATH %>' + 'lib/**/*',
					lineNums: true,
					js: [],
					css: [],
					extras: ['fileSearch', 'goToLine']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-cssmin'); //css minification plugin
	grunt.loadNpmTasks('grunt-contrib-htmlmin'); //HTML minification plugin
	grunt.loadNpmTasks('grunt-contrib-uglify'); //JS minification
	grunt.loadNpmTasks('grunt-contrib-requirejs'); //RequireJS optimization
	grunt.loadNpmTasks('grunt-contrib-clean'); //empty directory contents
	grunt.loadNpmTasks('grunt-contrib-copy'); //copy directory contents
	grunt.loadNpmTasks('grunt-contrib-concat'); //create bundles
	grunt.loadNpmTasks('grunt-jsbeautifier'); //formatting code
	grunt.loadNpmTasks('grunt-contrib-jshint'); //for hinting code quality
	grunt.loadNpmTasks('grunt-karma'); //cross-browser execution of unit tests
	grunt.loadNpmTasks('grunt-docker'); //automated process to document src code
	grunt.loadNpmTasks('grunt-contrib-jst'); //for pre-compiling templates

	// Default task.
	grunt.registerTask('default', 'show options', function () {
		grunt.log.writeln('\nThese are your options:\n');
		grunt.log.writeln('validate  <------- ensures code quality before checking in by code formatting, JSHint, and unit tests\n');
		grunt.log.writeln('document  <------- document the source code\n');
		grunt.log.writeln('optimize  <------- bundles and minifies applicable static files for optimal page performance\n');
	});

	// Run this task to validate your code quality, code formatting, hinting & unit tests
	grunt.registerTask('validate', function () {
		grunt.task.run(['jsbeautifier:modify']); //format the code
		grunt.task.run(['hint']); //validate for coding error
		grunt.task.run(['karmaValidate']); //run the unit tests
	});

	// Run this task to generate documentation from the JSDoc in your code
	grunt.registerTask('document', function () {
		grunt.task.run(['docker']);
	});

	// Run this task to optimize your code for a production or production-like environments
	grunt.registerTask('optimize', function () {
		grunt.task.run(['clean:target']); //delete any previous optimizations
		grunt.task.run(['copy:target']); //copy src files to target
		grunt.task.run(['cssmin']); //concat and minify css
		grunt.task.run(['jst']); //pre-compile templates
		grunt.task.run(['requirejs']); //optimize amd modules
		grunt.task.run(['uglify']); //minify JS files
	});

	// Trigger a one-time validation of files, based on operating system
	grunt.registerTask('karmaValidate', function () {
		if (isWindows()) {
			grunt.task.run(['karma:validateWindows']);
		} else {
			grunt.task.run(['karma:validateMac']);
		}
	});

	// Trigger continuous unit testing, based on operating system
	grunt.registerTask('karmaDev', function () {
		if (isWindows()) {
			grunt.task.run(['karma:windowsDev']);
		} else {
			grunt.task.run(['karma:macDev']);
		}
	});

	grunt.registerTask('format', ['jsbeautifier:modify']);
	grunt.registerTask('hint', ['jshint']);

	var isWindows = function () {
		return !!process.platform.match(/^win/);
	}
};
