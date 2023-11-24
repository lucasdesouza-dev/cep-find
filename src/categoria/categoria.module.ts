import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { MethodsService } from 'src/services/Methods/Methods.service';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, MethodsService],
})
export class CategoriaModule {}
