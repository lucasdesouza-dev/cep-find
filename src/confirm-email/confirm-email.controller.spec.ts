import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmEmailController } from './confirm-email.controller';
import { ConfirmEmailService } from './confirm-email.service';

describe('ConfirmEmailController', () => {
  let controller: ConfirmEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmEmailController],
      providers: [ConfirmEmailService],
    }).compile();

    controller = module.get<ConfirmEmailController>(ConfirmEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
