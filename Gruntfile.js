var banner = '/** <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today() %>\n' +
             ' *  (c) 2013 Christoph Körner, office@chaosmail.at, http://chaosmail.at\n' +
             ' *  License: MIT\n' +
             ' */\n';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: {
        src: ["dist/"]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: banner
      },
      css: {
          src: ['src/css/*.css'],
          dest: 'dist/<%= pkg.name %>.css'
      },
      js: {
        src: ['src/js/<%= pkg.name %>.js','src/js/<%= pkg.name %>.*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    cssmin: {
        dist: {
            files: {
                'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
            }
        }
    },
    uglify: {
      options: {
        banner: banner
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/*.js']
        }
      }
    },
    typescript: {
      base: {
        src: ['src/ts/dchart.ts'],
        dest: 'src/js/dchart.js',
        options: {
          target: 'es3', //or es5
          fullSourceMapPath: true,
          sourcemap: false,
          declaration: true
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/css/**/*.css', 'src/ts/**/*.ts'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', ['clean:dist', 'typescript', 'concat', 'cssmin', 'uglify']);
};