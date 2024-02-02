import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessKeyDto } from './dtos/accessKey.dto';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signUp(signupDto: SignupDto) {
    const randomUUID = crypto.randomUUID();
    const randomSalt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(signupDto.password, randomSalt);

    return this.prismaService.user.create({
      data: { ...signupDto, apiKey: randomUUID, password },
      select: {
        id: true,
        email: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getApiKey(accessKeyDto: AccessKeyDto): Promise<{ apiKey: string }> {
    const user = await this.prismaService.user.findFirst({
      where: { email: accessKeyDto.email },
    });

    const hasAccess = await bcrypt.compare(
      accessKeyDto.password,
      user.password,
    );

    if (!hasAccess) throw new UnauthorizedException('You do not have access!');

    return { apiKey: user.apiKey };
  }
}
