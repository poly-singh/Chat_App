// Finish Queries and Mutations. Auth?
// Line 19, references conversation.id
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type Auth {
        token: ID
        user: User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        profilePicture: String
    }

    type Query {
        user(username: String!): User

    }

    type Mutation {
        addUser(username: String!,email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;