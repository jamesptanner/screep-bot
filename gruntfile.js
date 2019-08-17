module.exports = function(grunt) {
    require('time-grunt')(grunt);
    var config = require('./.screeps.json')

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')
    grunt.loadNpmTasks("grunt-jsbeautifier")

    var currentdate = new Date();
    grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
    grunt.log.writeln('Branch: ' + config.branch)


    grunt.initConfig({
        screeps: {
            options: {
                server: {
                    host:config.host 
                },
                email: config.email,
                password: config.password,
                branch: config.branch,
                ptr: config.ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        },
        
        // Remove all files from the dist folder.
        clean: {
          'dist': ['dist']
        },

        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
          // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: 'dist/',
              filter: 'isFile',
              rename: function (dest, src) {
                // Change the path name utilize underscores for folders
                return dest + src.replace(/\//g,'_');
              }
            }],
          }
        },
        // Add version variable using current timestamp.
        file_append: {
        versioning: {
            files: [
            {
                append: "\nglobal.SCRIPT_VERSION = "+ currentdate.getTime() + "\n",
                input: 'dist/version.js',
            }
            ]
        }
        },
        // Apply code styling
        jsbeautifier: {
        modify: {
            src: ["src/**/*.js"],
            options: {
            config: '.jsbeautifyrc'
            }
        },
        verify: {
            src: ["src/**/*.js"],
            options: {
            mode: 'VERIFY_ONLY',
            config: '.jsbeautifyrc'
            }
        }
        }
    });

    grunt.registerTask('default',  ['clean', 'copy:screeps','file_append:versioning', 'screeps']);
    grunt.registerTask('test',     ['jsbeautifier:verify']);
    grunt.registerTask('pretty',   ['jsbeautifier:modify']);
}