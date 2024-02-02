import { Module } from '@nestjs/common';
import { MagicService } from './magic.service';
import { MagicController } from './magic.controller';

@Module({
  controllers: [MagicController],
  providers: [MagicService],
})
export class MagicModule {}
