/// <binding BeforeBuild='all' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
	grunt.initConfig({
		bower: {
			install: {
				options: {
					targetDir: "wwwroot/lib",
					layout: 'byType',
					install: true,
					verbose: false,
					cleanTargetDir: false,
					cleanBowerDir: false,
					bowerOptions: { production: false }
				}
			}
		},
		copy: {
			img: {
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: ['**'],
					dest: 'wwwroot/img'
				}]
			},
			data: {
				files: [{
					expand: true,
					cwd: 'db',
					src: ['**'],
					dest: 'wwwroot/db'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					cwd: 'assets/fonts',
					src: ['**'],
					dest: 'wwwroot/fonts'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					cwd: 'scripts',
					src: ['**'],
					dest: 'wwwroot/js'
				}]
			},
			views: {
				files: [{
					expand: true,
					cwd: 'views',
					src: ['**'],
					dest: 'wwwroot/views'
				}]
			}
		},
		//clean: ["temp/*"],
		//concat: {
		//	all: {
		//		src: ['Scripts/Tastes.js', 'Scripts/Food.js'],
		//		dest: 'Temp/combined.js'
		//	}
		//},
		jshint: {
			files: ['scripts/*.js'],
			options: {
				'-W069': false,
			}
		},
		//uglify: {
		//	all: {
		//		options: {
		//			beautify: true,
		//			mangle: false
		//		},
		//		files: [{
		//			expand: true,
		//			cwd: 'scripts',
		//			src: '*.js',
		//			dest: 'wwwroot/js'
		//		}]
		//	}
		//},
		less: {
			development: {
				options: {
					paths: ["styles"],
					cleancss: true
				},
				files: {
					"wwwroot/css/main.css": "styles/main.less"
				}
			}
		},		
		watch: {
			files: ["scripts/**/*.js", "styles/**/*.less", "wwwroot/**/*.html"],
			tasks: ["all"],
			options: {
				livereload: true
			},
		}
	});

	grunt.loadNpmTasks("grunt-bower-task");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	

	grunt.registerTask("default", ["bower:install"]); // maybe not needed
	grunt.registerTask("bower", 'bower');
	grunt.registerTask("all", ['copy', 'jshint', 'less']);
};