import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
@ApiTags('categorias')
@ApiBearerAuth('JWT-auth')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriaService.create(createCategoriaDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.categoriaService.findAll(user);
  }

  @Get(':id')
  findOne(@CurrentUser() user:User,@Param('id') id: string) {
    return this.categoriaService.findOne(id,user);
  }

  @Patch(':id')
  update(@CurrentUser() user:User,
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, updateCategoriaDto,user);
  }

  @Delete(':id')
  remove(@CurrentUser() user:User,@Param('id') id: string) {
    return this.categoriaService.remove(id,user);
  }
}
