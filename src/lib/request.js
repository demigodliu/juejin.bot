const _request = require('request');
module.exports = (url, options) => {
  return new Promise(function (resolve, reject) {
    _request(url, options, function (error, response, body) {
      error && reject(error);
      resolve(response, body);
    })
  })
};