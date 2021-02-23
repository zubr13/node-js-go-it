const mongoose = require('mongoose');

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 12 * 60 * 60 * 1000,
  },
});

// tokens
const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
