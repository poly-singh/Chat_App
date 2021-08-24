import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
            user(username: $username) {
                _id
                username
                email
                messages {
                        _id
                        messageText
                        createdAt
                }
            }
    }
`;

export const QUERY_MESSAGES = gql`
    query getMessages {
            messages {
                _id
                messageText
                messageAuthor
                createdAt
            }
    }
`;

export const QUERY_SINGLE_MESSAGE = gql`
    query getSingleMessage($messageId: ID!) {
        message(messageId: $messageId) {
                _id
                messageText
                messageAuthor
                createdAt
            }
    }
`;