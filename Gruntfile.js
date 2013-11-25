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
      },
      demo: {
        src: ["demo/ts"]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: banner
      },
      js: {
        src: ['lib/d3-styles/dist/d3-styles.js','src/js/<%= pkg.name %>.js','src/js/<%= pkg.name %>.*.js'],
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
        src: ['src/ts/references.ts', 'src/ts/Charts/*.ts'],
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
              'demo/js/<%= pkg.name %>.js.map': 'src/js/<%= pkg.name %>.js.map',
              'demo/js/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.min.js'
          }
      },
      ts: {
        files: [
          {
              expand: true,
              src: ['**'],
              dest: 'demo/ts',
              cwd: 'src/ts'
          }
        ]
      }
    },
    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      unit: {
        singleRun: false,
        background: true
      }
    },
    shell: {
        deploy: {
            options: {
                stdout: true
            },
            command: 'sh publish_demo'
        }
    },
    watch: {
      scripts: {
        files: ['src/css/**/*.css', 'src/ts/**/*.ts'],
        tasks: ['default']
      },
      karma: {
        files: ['test/**/*.js'],
        tasks: ['karma:unit:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');

  // Tasks
  grunt.registerTask('dist', ['clean', 'typescript', 'concat', 'uglify', 'copy']);
  grunt.registerTask('default', ['karma:unit', 'dist', 'karma:unit:run']);
  grunt.registerTask('test', ['karma:unit', 'watch']);
  grunt.registerTask('deploy', ['shell:deploy']);
};