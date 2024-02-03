import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MagicController } from './magic.controller';
import { MagicService } from './magic.service';

@Module({
  controllers: [MagicController],
  providers: [MagicService],
  imports: [AuthModule, PrismaModule, HttpModule],
})
export class MagicModule {}
