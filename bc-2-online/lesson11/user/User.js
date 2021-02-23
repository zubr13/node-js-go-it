const mongoose = require('mongoose');

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
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
  taskIds: [
    {
      type: ObjectId,
      ref: 'Task',
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// users
const User = mongoose.model('User', UserSchema);

module.exports = User;
