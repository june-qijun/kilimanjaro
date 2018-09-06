'use strict';
const axios = require('axios');

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async logout() {
        this.ctx.session = null;
        this.ctx.body = 'Logout.';
    }

    async githubLogin() {
        const code = this.ctx.request.body.code;
        const client_id = '3ef56cc0eabe1f73c4b0';
        const client_secret = '68e86b8debc8e835ff15f339b807604a8d6f2c57'
        try {
            let rep = await axios.post('https://github.com/login/oauth/access_token', {
                code,
                client_id,
                client_secret
            }, {
                    headers: {
                        Accept: 'application/json'
                    }
                });
            if (!rep.data.access_token) {
                this.ctx.body = {
                    status: 'error',
                    message: 'Get token faild.'
                };
                return;
            }
            const access_token = rep.data.access_token;
            rep = await axios.get(`https://api.github.com/user?access_token=${access_token}`);
            const user = rep.data;
            this.ctx.session.userId = user.id;
            user.name = user.login;
            await this.ctx.service.user.createUserIfNotExist(user);
            this.ctx.body = {
                status: 'ok',
                message: 'Login success.'
            };
        } catch (e) {
            this.logger.error(e);
            this.ctx.body = {
                status: 'error',
                message: 'Login faild.'
            };
        }
    }
}

module.exports = LoginController;
