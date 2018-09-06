'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const StateSchema = new Schema({
        data: String
    });

    return mongoose.model('State', StateSchema);
};
