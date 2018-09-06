'use strict';

const Controller = require('egg').Controller;

class StateController extends Controller {
    async index() {
        const user = await this.ctx.model.User.findById(this.ctx.session.userId);
        const state = await this.ctx.model.State.findById(user.state_id);
        this.ctx.body = JSON.stringify(state);
    }

    async update() {
        const user = await this.ctx.model.User.findById(this.ctx.user.id);
        const state = await this.ctx.model.State.upddateOne({
            _id: user.state_id
        }, {
                $set: {
                    data: this.ctx.params.state
                }
            });
        this.ctx.body = JSON.stringify(state);
    }
}

module.exports = StateController;
