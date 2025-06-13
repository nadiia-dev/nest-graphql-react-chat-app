import { gql } from "@apollo/client";

export const USER_START_TYPING_SUBSCRIPTION = gql`
  subscription UserStartTypingSubscription(
    $chatroomId: Float!
    $userId: Float!
  ) {
    userStartTyping(chatroomId: $chatroomId, userId: $userId) {
      id
      fullname
      email
      avatarUrl
    }
  }
`;
