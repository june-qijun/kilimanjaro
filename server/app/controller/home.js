'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async test() {
    this.ctx.body = { status: 'ok' };
  }
}

module.exports = HomeController;
