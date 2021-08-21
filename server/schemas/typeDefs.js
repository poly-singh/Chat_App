const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }

    type Message {
        _id: ID!
        messageText: String
        messageAuthor: String
        createdAt: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        profilePicture: String
        messages: [Message]
    }

    type Query {
        users: [User]
        user(username: String!): User
        messages(username: String): [Message]
        message(messageId: ID!): Message
        allMessages:[Message]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addMessage(messageText: String!): Message
    }

    type Subscription {
        messages:Message


    }
`;

module.exports = typeDefs;