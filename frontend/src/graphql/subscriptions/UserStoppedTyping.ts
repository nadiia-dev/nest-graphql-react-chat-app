import { gql } from "@apollo/client";

export const USER_STOPPED_TYPING_SUBSCRIPTION = gql`
  subscription UserStoppedTypingSubscription(
    $chatroomId: Float!
    $userId: Float!
  ) {
    userStoppedTyping(chatroomId: $chatroomId, userId: $userId) {
      id
      fullname
      email
      avatarUrl
    }
  }
`;
