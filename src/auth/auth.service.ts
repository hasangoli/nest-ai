import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signUp(signupDto: SignupDto) {
    const randomUUID = crypto.randomUUID();
    const randomSalt = await bcrypt.genSalt(10);
    const hashedApiKey = await bcrypt.hash(randomUUID, randomSalt);
    const password = await bcrypt.hash(signupDto.password, randomSalt);

    return this.prismaService.user.create({
      data: { ...signupDto, apiKey: hashedApiKey, password },
      select: {
        id: true,
        email: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
