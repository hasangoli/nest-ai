import { Injectable } from '@nestjs/common';
import Replicate from 'replicate';
import { CreateMagicDto } from './dto/create-magic.dto';

@Injectable()
export class MagicService {
  private replicate: Replicate;

  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
  }

  async generateMagicImage(createMagicDto: CreateMagicDto) {
    const output = await this.replicate.run(
      'tencentarc/photomaker-style:467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769',
      {
        input: {
          prompt: createMagicDto.prompt,
          num_steps: 50,
          style_name: '(No style)',
          input_image: createMagicDto.base64Image,
          num_outputs: 1,
          guidance_scale: 5,
          negative_prompt:
            'realistic, photo-realistic, worst quality, greyscale, bad anatomy, bad hands, error, text',
          style_strength_ratio: 35,
        },
      },
    );

    return output;
  }
}
