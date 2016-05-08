module.exports = {

  // config hot load server address.
  hotServer: 'http://localhost:3000',
  // use for webpack config.
  publicPath: 'http://localhost:3000/dist/',
  //
  serverRender: true,

  //for build, webpack build will load this configuration to build different bundle.
  builds: {
    default: {
      js: './app/client.js',
      css: './assets/themes/default/index.styl'
    },
    another: {
      js: './app/client.js',
      css: './assets/themes/another/index.styl'
    }

  },

  // server will load this to detect use with build bundle.
  maps: [
    {enable: true, host: 'localhost:8000', build: 'default'},
    {enable: true, host: 'master.merlin.cq:8000', build: 'another'}
  ]

};
