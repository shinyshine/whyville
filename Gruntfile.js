module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: './app/less', //less文件的位置
                    src: ['**/*.less'],  //目标文件
                    dest: './app/css', //编译完成的css的位置
                    ext: '.css'   //编译完成的文件后缀名
                }]
            }
        },
        watch: {
            options: {
                livereload: true   //浏览器实时刷新
            },
            scripts: {
                files: ['./app/less/**/*.less', './app/views/**/*.html', './app/index.html'],  //实时刷新的监听文件
                tasks: ['less'], //监听到以上文件发生变化就执行less任务
                options: {
                    spawn: false,
                },
            },
        },
        connect: {
            server: {
                options: {
                    protocol: 'http',
                    port: 8000,
                    // keepalive: true,
                    //base: ['./app']  //注意根目录的配置
                }
            }
        }

    });
 
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['connect', 'watch']);
}