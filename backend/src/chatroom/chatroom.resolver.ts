import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
// @ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { ChatroomService } from './chatroom.service';
import { UserService } from 'src/user/user.service';
import { PubSub } from 'graphql-subscriptions';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Chatroom, Message } from './chatroom.types';

@Resolver()
export class ChatroomResolver {
  constructor(
    private readonly chatroomService: ChatroomService,
    private readonly userService: UserService,
  ) {
    this.pubSub = new PubSub();
  }

  @UseFilters(GraphQLErrorFilter)
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Chatroom)
  async createChatroom(
    @Args('name') name: string,
    @Context() context: { req: Request },
  ) {
    return this.chatroomService.createChatroom(name, context.req.user.sub);
  }

  @Mutation(() => Chatroom)
  async addUsersToChatroom(
    @Args('chatroomId') chatroomId: number,
    @Args('userIds', { type: () => [Number] }) userIds: number[],
  ) {
    return this.chatroomService.addUsersToChatroom(chatroomId, userIds);
  }

  @Query(() => [Chatroom])
  async getChatroomsForUser(@Args('userId') userId: number) {
    return this.chatroomService.getChatroomsForUser(userId);
  }

  @Query(() => [Message])
  async getMessagesForChatroom(@Args('chatroomId') chatroomId: number) {
    return this.chatroomService.getMessagesForChatroom(chatroomId);
  }
  @Mutation(() => String)
  async deleteChatroom(@Args('chatroomId') chatroomId: number) {
    await this.chatroomService.deleteChatroom(chatroomId);
    return 'Chatroom deleted successfully';
  }
}
