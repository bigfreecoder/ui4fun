# Multi Themes Mechanism

We can build multi themes via build configuration in `build.config.js`. You only need add a theme and speicify the entry about js and css.

```js
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
```

And you need specify the mapping in `build.config.js`. Then in `server.js` you need have a logic to decide use which theme. In this starter kit, we detect the hostname to decide use which theme. You can change this logic to use cookie or something else.

```js
// server will load this to detect use with build bundle.
maps: [
  {enable: true, host: 'localhost:8000', build: 'default'},
  {enable: true, host: 'master.merlin.cq:8000', build: 'another'}
]
```

```js
//through req hostname to get the relevant source. you also can use your way to do this.
var host = req.headers.host;
var d = _.find(config.maps, function (item) {
  return item.enable == true && item.host === host;
});
var build = d && d.build || 'default';
var source = {js: [], css: []};
if ('production' !== process.env.NODE_ENV) {
  source.js.push(config.publicPath + 'reactkits.js');
  source.js.push(config.publicPath + build + '/bundle.js');
  source.css.push(config.publicPath + build + '/bundle.css');
} else {
  source.js.push('./dist/reactkits.js');
  source.js.push('./dist/' + build + '/bundle.js');
  source.css.push('./dist/' + build + '/bundle.css');
}
```
