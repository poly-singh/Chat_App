const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const MessageSchema = new Schema(
    {
        messageText: {
            type: String,
            required: 'You need to add a message',
            minlength: 1,
            maxlength: 280,
            trim: true,
        },
        messageAuthor: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
);

const Message = model('Message', MessageSchema);
module.exports = Message;