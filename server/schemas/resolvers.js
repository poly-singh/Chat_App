
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const User  = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation')

const resolvers = {
    Query:{ 
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        // Finds all messages the belong to the active conversation.
        messages: async (parent, args, context) => {
            return Message.find({conversationId: args._id});
        },
        // Finds all conversations that the user is included in.
        conversations: async (parent, args, context) => {
            return Conversation.find({_id: {$in: members}});
        }

        


    },
    Mutation:{
        addUser: async (parent, { username, email, password})=> {
            const user = await User.create({ username, email, password})
            const token = signToken(user);
            return { token, user };
        },

        // addMessage: async (parent, args, context) => {
        //     const message = await Message.create(args)
        //     return message
        // },

        // addConversation: async (parent, args, context) => {
        //     const conversation = await Conversation.create(args)
        //     return conversation
        // }
    }
}

module.exports = resolvers;