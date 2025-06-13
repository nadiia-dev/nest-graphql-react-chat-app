import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { User } from './user.type';
import { Request } from 'express';
// @ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { join } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('fullname') fullname: string,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: FileUpload,
    @Context() context: { req: Request },
  ) {
    const imageUrl = file ? await this.storeImageAndGetUrl(file) : undefined;
    const userId = context.req.user?.sub;
    return this.userService.updateUserProfile(userId!, fullname, imageUrl);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [User])
  async searchUsers(
    @Args('fullname') fullname: string,
    @Context() context: { req: Request },
  ) {
    return this.userService.searchUsers(fullname, context.req.user!.sub);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [User])
  getUsersOfChatroom(@Args('chatroomId') chatroomId: number) {
    return this.userService.getUsersOfChatroom(chatroomId);
  }

  private async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;
    const readStream = createReadStream();
    readStream.pipe(fs.createWriteStream(imagePath));
    return imageUrl;
  }
}
