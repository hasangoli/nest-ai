import { Test, TestingModule } from '@nestjs/testing';
import { MagicController } from './magic.controller';
import { MagicService } from './magic.service';

describe('MagicController', () => {
  let controller: MagicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagicController],
      providers: [MagicService],
    }).compile();

    controller = module.get<MagicController>(MagicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
