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
        src: ["dist/", "demo/js"]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: banner
      },
      js: {
        src: ['src/js/<%= pkg.name %>.js','src/js/<%= pkg.name %>.*.js'],
        dest: 'dist/<%= pkg.name %>.js'
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
    copy: {
      demo: {
          files: {
              'demo/js/<%= pkg.name %>.js': 'dist/<%= pkg.name %>.js',
              'demo/js/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.min.js'
          }
      },
      libs: {
        files: {
            'demo/lib/d3.js': 'components/d3/d3.js',
            'demo/lib/d3.min.js': 'components/d3/d3.min.js',
            'demo/lib/d3-styles.js': 'components/d3-styles/dist/d3-styles.js',
            'demo/lib/d3-styles.min.js': 'components/d3-styles/dist/d3-styles.min.js',
            'demo/lib/underscore.js': 'components/underscore/underscore.js',
            'demo/lib/underscore.min.js': 'components/underscore/underscore-min.js'
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', ['clean:dist', 'typescript', 'concat', 'uglify', 'copy']);
};