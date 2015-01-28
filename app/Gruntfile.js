module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			options: {
				livereload: true
			},
			main: {
				files: [
					'www/index.html', 
					'www/admin/*.html',
					'www/admin/pages/*.html',
					'www/user/*.html'
				]
			},
			js: {
				files: ['www/js/*.js']
			},
			css: {
				files: ['www/styles/*.css']
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')

	grunt.registerTask('default', ['watch'])

}