const mongoose = require('mongoose');

function buildModel(app) {
    app.model = {};
    const UserSchema = new mongoose.Schema({
        _id: String,
        name: String,
        state_id: mongoose.SchemaTypes.ObjectId
    }, {
        timestamps: true
    });

    app.model.User = mongoose.model('users', UserSchema);
    const StateSchema = new mongoose.Schema({
        data: String
    }, {
        timestamps: true
    });
    app.model.State = mongoose.model('states', StateSchema);
}

async function clearModel(app) {
    for (const key of Object.keys(app.model)) {
        await app.model[key].deleteMany();
    }
}

async function createNewUser(id, userName, app) {
    const oldUser = await app.model.User.findById(id);
    if (oldUser) {
        return;
    }
    const state = await app.model.State.create({
        data: JSON.stringify({})
    });
    const user = await app.model.User.create({
        _id: id,
        name: userName,
        state_id: state._id
    });
    return user;
}

function main() {
    const url = 'mongodb://localhost:27017/myworld';
    const app = {};
    mongoose.connect(url, {
        useNewUrlParser: true
    }).then(async () => {
        const db = mongoose.connection;
        buildModel(app);
        clearModel(app);
        const user = await createNewUser('12345', 'june', app);
        console.log(user);
        db.close();
    }).catch(e => {
        console.error(e);
    })
}

main();