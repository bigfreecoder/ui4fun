var axios = require('axios');

axios.interceptors.request.use(function (config) {
  config.timeout = 60000;
  return config;
});

module.exports = axios;
