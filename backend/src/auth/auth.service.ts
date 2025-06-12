import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto';
import bcryptjs from 'bcryptjs';

interface JwtPayload {
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'] as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (error: unknown) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const userExists = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!userExists) {
      throw new BadRequestException('User no longer exists');
    }

    const expiresIn = 15000;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;
    const accessToken = this.jwtService.sign(
      { ...payload, exp: expiration },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );
    res.cookie('access_token', accessToken, { httpOnly: true });

    return accessToken;
  }

  private issueTokens(user: User, res: Response) {
    const payload = { username: user.fullname, sub: user.id };

    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '150sec',
      },
    );
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });
    return { user };
  }

  async validateUser(loginDto: LoginDto) {
    const user = (await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    })) as User;

    if (user && (await bcryptjs.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async registerUser(userData: RegisterDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (user) {
      throw new BadRequestException({ email: 'Email already in use' });
    }

    const hashedPassword = await bcryptjs.hash(userData.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        fullname: userData.fullname,
        password: hashedPassword,
        email: userData.email,
      },
    });

    return this.issueTokens(newUser, res);
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new BadRequestException({
        email: 'User with this email not found',
      });
    }
    return this.issueTokens(user, res);
  }

  logout(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return 'Successfully logged out';
  }
}
