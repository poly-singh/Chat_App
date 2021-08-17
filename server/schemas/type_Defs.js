// Finish Queries and Mutations. Auth?
// Line 19, references conversation.id
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Conversation {
        _id: ID!
        members: [String]
        createdAt: Date
        updatedAt: Date
    }

    type Message {
        _id: ID!
        conversationId:
        author: String
        content: String
        createdAt: Date
        updatedAt: Date
    }

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
        addUser
        // createConversation
        // createMessage
        // updateMessage
        // deleteMessage

    }
`;

module.exports = typeDefs;