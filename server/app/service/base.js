const Service = require('egg').Service;

class BaseService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async create(params) {
    
  }
}

module.exports = BaseService;