module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserSync: {
			bsFiles: {
				src: ['src/css/*.css', 'src/js/*.js', 'src/*.html', 'src/parts/*.html'],
			},
			options: {
				watchTask: true,
				reloadDelay: 300,
				server: {
					baseDir: "./build"
				}
		   }
		},

		includereplace: {
			dev: {
				options: {
					// Task-specific options go here.
				},
				// Files to perform replacements and includes with
				src: './src/*.html',
				// Destination directory to copy files to
				dest: './build/',
				expand: true,
			},
			development: {
				files: [{
					cwd: 'src/',
					src: ['*.html'],
					dest: 'build/',
					expand: true,
				}]
			},
		},

		copy: {
			files: {
				cwd: 'src/', // set working folder / root to copy
				src: '**/*/**', // copy all files and subfolders
				dest: 'build/', // destination folder
				expand: true, // required when using cwd
			}
		},

		watch: {
			options: {
				spawn: false,
				livereload: true,
			},

			scripts: {
				files: [
					'src/js/*.js'
				]
			},

			styles: {
				files: [
					'src/css/*.css',
					'src/*.html',
				]
			},
			files: ['src/**'],
			tasks: ['includereplace:development', 'copy'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-include-replace');

	// Default task(s).
	grunt.registerTask('default', ['includereplace:development', 'copy', 'browserSync', 'watch']);
};