import { Test, TestingModule } from '@nestjs/testing';
import { LoginSemSenhaService } from './login-sem-senha.service';

describe('LoginSemSenhaService', () => {
  let service: LoginSemSenhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginSemSenhaService],
    }).compile();

    service = module.get<LoginSemSenhaService>(LoginSemSenhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
