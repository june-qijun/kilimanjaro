const Service = require('egg').Service;

const _initState = {
    "notes": {
        byId: {
            "1f321677-327f-4da8-b4ac-d989c70c77b3": {
                "title": "凹凸实验室",
                "url": "https://aotu.io/index.html",
                "content": "京东前端实验室",
                "belong": ["637f32b0-6da7-4a24-b29d-fff518348b13"]
            }
        },
        allIds: ["1f321677-327f-4da8-b4ac-d989c70c77b3"]
    },
    "activeNote": "1f321677-327f-4da8-b4ac-d989c70c77b3",
    "activeWorldNode": "637f32b0-6da7-4a24-b29d-fff518348b13",
    "isShowWorld": false,
    "worldTree": {
        "byId": {
            "637f32b0-6da7-4a24-b29d-fff518348b13": {
                "title": "Big Bang",
                "content": "The Beginning of everything.",
                "children": ["4d846aad-529d-42b0-980e-7e6f1b45badf"]
            },
            "4d846aad-529d-42b0-980e-7e6f1b45badf": {
                "title": "React",
                "content": "Fackbook前端框架",
                "children": ["30c820b1-01ea-46a3-be67-6178758d86c3"]
            },
            "30c820b1-01ea-46a3-be67-6178758d86c3": {
                "title": "Redux",
                "content": "数据流管理框架",
                "children": []
            }
        },
        "root": "637f32b0-6da7-4a24-b29d-fff518348b13"
    },
    "isLogin": true
};

class UserService extends Service {
    async createUserIfNotExist(user) {
        const u = await this.ctx.model.User.findById(user.id);
        if (u) {
            return;
        }
        this.logger.info(`Create user ${user.name}`);
        const initState = await this.ctx.model.State.create({
            data: JSON.stringify(_initState)
        });
        const newUser = await this.ctx.model.User.create({
            _id: user.id,
            state_id: initState.id,
            name: user.name,
            origin_data: JSON.stringify(user)
        });
    }
}

module.exports = UserService;