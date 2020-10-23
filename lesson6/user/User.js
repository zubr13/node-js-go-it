const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    tasks: [{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }],
});

module.exports = mongoose.model('User', UserSchema);