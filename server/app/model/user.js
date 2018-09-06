'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        _id: String,
        state_id: Schema.Types.ObjectId,
        name: String,
        origin_data: String
    });

    return mongoose.model('User', UserSchema);
}
