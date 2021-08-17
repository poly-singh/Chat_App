const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
    {
        conversationId: {
            type: String,
        },
        author: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    // Add timestamps for when messages are sent and/or updated.
    { timestamps: true }
);

const Message = model('Message', MessageSchema);
module.exports = Message;