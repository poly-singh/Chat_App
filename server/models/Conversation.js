const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema(
    {
        members:  [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    // Add timestamps for when conversations are created and/or updated.
    { timestamps: true }
);

const Conversation = model('Conversation', ConversationSchema);
module.exports = Conversation;