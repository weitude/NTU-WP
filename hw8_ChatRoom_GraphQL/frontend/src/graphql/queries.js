import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query chatbox($chatBoxName: String!) {
    chatbox(chatBoxName: $chatBoxName) {
      name
      messages {
        sender
        body
      }
    }
  }
`;