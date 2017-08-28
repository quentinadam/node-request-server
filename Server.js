const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('./request');

class Server {
  constructor() {
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
      ctx.body = await client.request(url, options);
    });
  }

  listen(port = 80, address) {
    this.app.listen(port, address);
  }
}

module.exports = Server;
