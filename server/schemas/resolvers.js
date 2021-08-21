const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const User  = require('../models/User');
const Message = require('../models/Message');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const messages = []; //stores all the messages sent
const subscribers = []; //stores any new messages sent upon listening

//to push new users to the subscribers array
const onMessagesUpdates = (fn) => subscribers.push(fn);


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
        allMessages: () => {
        return messages;
           
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
                // messageAuthor: context.user.username,
                messageAuthor: "abc",
            });
    
            await User.findOneAndUpdate(
                // { _id: context.user._id },
                { _id: "61215637689fae49e40b2997" },
                { $addToSet: { message: message._id } }
            );
            // console.log(message);
            messages.push(message)
            // pubsub.publish('MESSAGE_CREATED', { messageCreated: args });
            console.log(subscribers, typeof subscribers);
            subscribers.forEach((fn) => fn()); //add this line

    
            return message;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },
    Subscription: {
        messages: {
            subscribe:(parent,args) => {
                // console.log(pubsub);
                // onMessagesUpdates(() => pubsub.publish({ messages }));
                // //publish all messages immediately once a user subscribed
                // setTimeout(() => pubsub.publish(channel, { messages }), 0);
                // return pubsub;
                // subscribe: () => pubsub.asyncIterator(['MESSAGE_CREATED'])
                const channel = 000
    
                //push the user to the subscriber array with onMessagesUpdates function and 
                //publish updated messages array to the channel as the callback
                console.log(messages,"subscription")
                onMessagesUpdates(() => pubsub.publish(messages));
        
                //publish all messages immediately once a user subscribed
                setTimeout(() => pubsub.publish(messages), 0);
        
                //returns the asyncIterator
                return pubsub.asyncIterator();
            }
        }
    }
}

module.exports = resolvers;