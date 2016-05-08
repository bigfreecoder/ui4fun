# API Client

We use [axios](https://github.com/mzabriskie/axios) to deal with http request both for browser and node.

We have `api_client.js`. You can intercept request and response. Like we set a timeout for each request.
```js
axios.interceptors.request.use(function (config) {
  config.timeout = 60000;
  return config;
});
```

You can find more information from [Here](https://github.com/mzabriskie/axios#interceptors).
