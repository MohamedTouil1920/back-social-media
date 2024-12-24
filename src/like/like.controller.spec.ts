import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikesService } from './like.service';

describe('LikeController', () => {
  let controller: LikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [LikesService],
    }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
