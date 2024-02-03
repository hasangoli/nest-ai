import { HttpService } from '@nestjs/axios';
import { Body, Controller, Header, Post, UseGuards } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { tap } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMagicDto } from './dto/create-magic.dto';
import { MagicService } from './magic.service';

@Controller()
export class MagicController {
  constructor(
    private readonly magicService: MagicService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/magic-image')
  @UseGuards(AuthGuard)
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename="magic.png"')
  async generateMagicImage(@Body() createMagicDto: CreateMagicDto) {
    const generatedImageUrl =
      await this.magicService.generateMagicImage(createMagicDto);

    this.httpService.get(generatedImageUrl[0], { responseType: 'stream' }).pipe(
      tap((response) => {
        response.data.pipe(createWriteStream('magic.png'));
      }),
    );

    return 'File downloaded!';
  }
}
