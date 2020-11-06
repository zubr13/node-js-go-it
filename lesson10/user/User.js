const mongoose = require('mongoose');
const { Schema, Types: {ObjectId } } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasksIds: [{
        type: ObjectId,
        ref: 'Task'
    }]
});

module.exports = mongoose.model('User', UserSchema);