import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserProfile(
    userId: number,
    fullname: string,
    avatarUrl?: string,
  ) {
    if (avatarUrl) {
      const oldUserData = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          fullname,
          avatarUrl,
        },
      });

      if (oldUserData?.avatarUrl) {
        const name = oldUserData?.avatarUrl.split('/').pop() as string;
        const path = join(__dirname, '..', '..', 'public', 'images', name);
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      }
      return updatedUser;
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: { fullname },
    });
  }

  async searchUsers(fullname: string, userId: number) {
    return await this.prisma.user.findMany({
      where: {
        fullname: {
          contains: fullname,
        },
        id: {
          not: userId,
        },
      },
    });
  }

  async getUsersOfChatroom(chatroomId: number) {
    return this.prisma.user.findMany({
      where: {
        chatrooms: {
          some: {
            id: chatroomId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUser(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
