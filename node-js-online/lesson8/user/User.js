const mongoose = require('mongoose');
const {
    Schema,
    Types: { ObjectId },
} = mongoose;

const userSchema = new Schema({
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
            required: true,
            ref: 'Task',
        },
    ],
    projectIds: [
        {
            type: ObjectId,
            required: true,
            ref: 'Project',
        },
    ],
});

// users
module.exports = mongoose.model('User', userSchema);
