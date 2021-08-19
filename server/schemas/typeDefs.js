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
        conversations(_id: ID): [Conversation]
        messages(conversationId: ID): [Message]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addMessage(conversationId: ID, author: String, content: String): Message
        addConversation(_id: ID): Conversation
    }
`;

module.exports = typeDefs;