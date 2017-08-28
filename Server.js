const util = require('util');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('./request');

class Server {

  constructor(verbose) {
    this.app = new Koa();

    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        ctx.status = 400;
        ctx.body = {error: error.message};
      }
    });

    this.app.use(bodyParser({
      enableTypes: ['json'],
      strict: true,
    }));

    this.app.use(async (ctx) => {
      let url = ctx.request.body.url;
      if (!url) throw new Error('Missing parameter url');
      let options = ctx.request.body.options;
      if (verbose) {
        if (options) {
          console.log(url, util.inspect(options, {depth: null, breakLength: Infinity}));
        } else {
          console.log(url);
        }
      }
      ctx.body = await request(url, options);
    });
  }

  listen(port = 80, address) {
    return new Promise((resolve, reject) => {
      try {
        this.app.listen(port, address, () => {
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = Server;
