import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKey = request.headers['api-key'];

    if (!apiKey) return false;

    const user = await this.prismaService.user.findUnique({
      where: { apiKey },
    });

    if (!user) return false;

    return true;
  }
}
