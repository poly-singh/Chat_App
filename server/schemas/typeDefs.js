// Finish Queries and Mutations. Auth?
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID
        user: User
    }

    type Conversation {
        _id: ID!
        members: [User]
    }

    type Message {
        _id: ID!
        conversationId: [Conversation]
        author: String
        content: String
        createdAt: Date
        updatedAt: Date
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
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;