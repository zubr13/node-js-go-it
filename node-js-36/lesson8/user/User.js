const mongoose = require('mongoose');
const {
    Schema,
    Types: { ObjectId },
} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => value.includes('@'),
    },
    password: {
        type: String,
        required: true,
    },
    tasksIds: [
        {
            type: ObjectId,
            ref: 'Task',
        },
    ],
});

// users
const User = mongoose.model('User', UserSchema);

module.exports = User;
