const request = require('request');

module.exports = function(url, options) {
  return new Promise((resolve, reject) => {
    request(url, options, (error, response, body) => {
      if (error) return reject(error);
      resolve({statusCode: response.statusCode, headers: response.headers, body});
    });
  });
}
