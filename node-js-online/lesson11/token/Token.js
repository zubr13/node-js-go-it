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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expiresIn: 1000 * 60 * 60 * 12,
    },
    userId: {
        type: ObjectId,
        required: true,
    },
});

// tokens
module.exports = mongoose.model('Token', TokenSchema);
