import { Test, TestingModule } from '@nestjs/testing';
import { IdeationController } from '../web/rest/ideation.controller';

describe('IdeationController', () => {
  let controller: IdeationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeationController],
    }).compile();

    controller = module.get<IdeationController>(IdeationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
