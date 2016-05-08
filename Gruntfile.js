var url = require('url');
var webpackDevConfig = require('./webpack.dev.js');
var webpackProdConfig = require('./webpack.prod.js');
var buildConfig = require('./build.config.js');
var hotServer = url.parse(buildConfig.hotServer);

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      dev: webpackDevConfig,
      prod: webpackProdConfig
    },
    'webpack-dev-server': {
      options: {
        webpack: webpackDevConfig,
        publicPath: webpackDevConfig.output.publicPath
      },
      start: {
        keepAlive: true,
        hot: true,
        historyApiFallback: true,
        host: hotServer.hostname,
        port: hotServer.port,
        stats: {
          colors: true
        }
      }
    },
    nodemon: {
      dev: {
        script: './index.js',
        options: {
          nodeArgs: [ /*'--debug'*/ ],
          ignore: ['node_modules/**'],
          ext: 'js,jsx',
          env: {
            NODE_ENV: 'development',
            __SERVERRENDER__: buildConfig.serverRender
          },
        },
      },
      prod: {
        script: './index.js',
        options: {
          ignore: ['node_modules/**'],
          nodeArgs: [ /*'--debug'*/ ],
          ext: 'js,jsx',
          env: {
            NODE_ENV: 'production',
            __SERVERRENDER__: buildConfig.serverRender
          }
        }
      }
    },

    eslint: {
      target: ['app/*']
    },

    mochaTest: {
      test: {
        src: ['test/setup/*.js', 'test/*.js']
      },
    }
  })

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('server', 'run node server', function (arg) {
    switch(arg) {
      case 'dev': grunt.task.run('nodemon:dev');break;
      case 'prod': grunt.task.run('nodemon:prod');break;
      default: grunt.task.run('nodemon:dev');break;
    }
  });

  grunt.registerTask('hot', ['webpack-dev-server']);

  grunt.registerTask('build', 'build application', function (arg) {
    switch(arg) {
      case 'dev': grunt.task.run('webpack:dev');break;
      case 'prod': grunt.task.run('webpack:prod');break;
      default: grunt.task.run('webpack:dev');break;
    }
  });

  grunt.registerTask('code', ['eslint']);

  grunt.registerTask('test', 'run all tests', function (arg) {
      var tasks = ['mochaTest'];
      // if specified, use force so it doesn't fail out on warnings
      grunt.option('force', arg==='force');
      grunt.task.run(tasks);
  });
}
