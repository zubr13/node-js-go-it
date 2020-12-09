const mongoose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const TokenSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1000 * 60 * 60,
  },
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Token", TokenSchema);
