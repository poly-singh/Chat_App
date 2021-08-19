const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const User  = require('../models/User');
const Message = require('../models/Message');

const resolvers = {
    Query:{
        users: async () => {
            return User.find().populate('messages');
        }, 
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('messages');;
        },
        messages: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Message.find(params).sort({ createdAt: -1 });
        },
        // Find all messages.
        message: async (parent, { messageId }) => {
            return Thought.findOne({ _id: messageId });
        },
    },
    Mutation:{
        addUser: async (parent, {username, email, password}, context)=> {
            const user = await User.create({username, email, password})
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
    
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
    
            const correctPw = await user.isCorrectPassword(password);
    
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
    
            return { token, user };
        },

        addMessage: async (parent, { messageText }, context) => {
            if (!context.user) {
            const message = await Message.create({
                messageText,
                messageAuthor: context.user.username,
                // messageAuthor: "test2",
            });
    
            await User.findOneAndUpdate(
                { _id: context.user._id },
                // { _id: "611dd4a2064a8e431c2c34fc" },
                { $addToSet: { message: message._id } }
            );
    
            return message;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    }
}

module.exports = resolvers;