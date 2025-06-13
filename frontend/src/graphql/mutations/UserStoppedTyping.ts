import { gql } from "@apollo/client";

export const USER_STOPPED_TYPING = gql`
  mutation UserStoppedTyping($chatroomId: Float!) {
    userStoppedTypingMutation(chatroomId: $chatroomId) {
      id
      fullname
      email
    }
  }
`;
