import { gql } from "@apollo/client";

export const USER_START_TYPING = gql`
  mutation UserStartTyping($chatroomId: Float!) {
    userStartTypingMutation(chatroomId: $chatroomId) {
      id
      fullname
      email
    }
  }
`;
