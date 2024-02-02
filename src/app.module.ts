import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MagicModule } from './magic/magic.module';

@Module({
  imports: [AuthModule, PrismaModule, MagicModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
