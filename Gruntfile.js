/*global module:false*/
module.exports = function(grunt) {
	// To generate json from csv
	// http://jsfiddle.net/n9unmueg/2/

	// Project configuration.
	grunt.initConfig({
		concat: {
			build: {
				//must follow an order
				src: [
					"src/scripts/libs/zepto.min.js",
					"src/scripts/libs/underscore-min.js",
					"src/scripts/libs/backbone-min.js",
					"src/scripts/models/*.js",
					"src/scripts/collections/*.js",
					"src/scripts/routers/*.js",
					"src/scripts/views/*.js",
					"src/scripts/*.js"
				],
				dest: 'build/compressed.js'
			}
		},
		//Copy first, then
		copy: {
			build: {
				files: [
					{
						src: "src/index.html",
						dest: "build/index.html"
					},
					// Static json file as a placeholder
					{
						src: "src/data.json",
						dest: "build/data.json"
					},
					{
						expand: true,
						cwd: 'src/css/',
						src: ['**'],
						dest: 'build/css/'
					},
					{
						expand: true,
						cwd: 'src/imgs/',
						src: ['**'],
						dest: 'build/imgs/'
					},
					{
						src: "public/.htaccess",
						dest: "build/.htaccess"
					}
				]
			}

		},
		clean: {
			build: ['build/*']
		},
		less: {
			options: {
				paths: [
					'src/less/'
				]
			},

			all: {
				files: [{
					expand: true,
					cwd: 'src/less/',
					src: '*.less',
					ext: '.css',
					dest: 'src/css/'
				}]
			}

		},
		autoprefixer: {
			options: {
				browsers: ['last 2 version', '> 1%', "chrome > 20", "safari > 5", "firefox > 15"]
			},

			all: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: '*.css',
					dest: 'src/css/'
				}]
			}

		},
		//Minimized CSS
		cssmin: {
			build: {
				files: [{
					expand: true,
					cwd: 'build/css/',
					src: '*.css',
					dest: 'build/css/'
				}]
			}
		},
		uglify: {
			build: {
				options: {
					banner: '/*! grunt-created */\n',
					beautify: {
						beautify: false,
						max_line_len: 140
					}
				},
				files: [{
					src: 'build/compressed.js',
					dest: 'build/compressed.js'
				}]
			}
		},
		htmlmin: {
			build: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: 'build/',
					src: '*.html',
					dest: 'build/'
				}]
			}
		},
		// Requires Apache rewrite rule. see .htaccess
		compress: {
			build: {
				options: {
					mode: 'gzip'
				},
				files: [
					{
						src: "build/index.html",
						dest: "build/index.html.gz"
					},
					{
						src: "build/compressed.js",
						dest: "build/compressed.js.gz"
					},
					{
						expand: true,
						cwd: 'build/css/',
						src: ['**'],
						dest: 'build/css/',
						ext: '.css.gz'
					}
				]
			}
		},
		watch: {
			options: {
				dateFormat: function (time) {
					grunt.log.writeln('Grunt Watch took: ' + time + 'ms @ ' + (new Date()).toString());
				},
				interrupt: true

			},
			css: {
				files: ['src/less/*.less'],
				tasks: ['less', 'autoprefixer']
			}
		}
	});

	grunt.registerTask('replaceScripts', 'Replace all script tags to Built', function () {
		var s = grunt.file.read('build/index.html', 'utf8');
		s = s.replace(/<script src="(.*?)"><\/script>/g, '');
		s = s.replace('</body>','<script src="compressed.js"></script></body>');
		grunt.file.write('build/index.html', s);
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Default task.
	grunt.registerTask('build', [
		'clean',
		'less:all',
		'autoprefixer:all',
		'concat',
		'copy',
		'replaceScripts',
		'cssmin',
		'uglify',
		'htmlmin',
		'compress'
	]);

	// grunt update dev files. just like grunt watch, but manually update
	grunt.registerTask('default', [
		'less:all',
		'autoprefixer:all'
	]);
};
