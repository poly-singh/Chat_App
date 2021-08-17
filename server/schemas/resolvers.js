
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const User  = require('../models/User')

const resolvers = {
    Query:{ 
        user: async (parent, { username }) => {
            return User.findOne({ username });
        }
    },
    Mutation:{
        addUser: async (parent, { username, email, password})=> {
            const user = await User.create({ username, email, password})
            const token = signToken(user);
            return { token, user };

                  
        }
    }
}

 






