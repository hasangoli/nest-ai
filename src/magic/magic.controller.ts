import { Body, Controller, Post } from '@nestjs/common';
import { CreateMagicDto } from './dto/create-magic.dto';
import { MagicService } from './magic.service';

@Controller()
export class MagicController {
  constructor(private readonly magicService: MagicService) {}

  @Post('/magic-image')
  async generateMagicImage(@Body() createMagicDto: CreateMagicDto) {
    return this.magicService.generateMagicImage(createMagicDto);
  }
}
