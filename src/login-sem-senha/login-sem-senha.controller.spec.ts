import { Test, TestingModule } from '@nestjs/testing';
import { LoginSemSenhaController } from './login-sem-senha.controller';
import { LoginSemSenhaService } from './login-sem-senha.service';

describe('LoginSemSenhaController', () => {
  let controller: LoginSemSenhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginSemSenhaController],
      providers: [LoginSemSenhaService],
    }).compile();

    controller = module.get<LoginSemSenhaController>(LoginSemSenhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
