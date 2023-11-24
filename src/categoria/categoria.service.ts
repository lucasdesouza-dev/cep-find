import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from 'src/user/entities/user.entity';
import { MethodsService } from 'src/services/Methods/Methods.service';

@Injectable()
export class CategoriaService {
  constructor(
    private readonly prisma: PrismaService,
    private methodsService: MethodsService,
  ) { }

  async create(createCategoriaDto: CreateCategoriaDto, user: User) {
    const { categoria } = createCategoriaDto;

    const data = {
      categoria,
      tenantUuid: user.tenantUuid,
    };

    if (user.tenantUuid) {
      const tenant = await this.prisma.tenant.findUnique({
        where: { uuid: user.tenantUuid },
        include: {
          categoria: true,
        },
      });
      const categoria = tenant.categoria;
      const categoriaExistent = categoria.find(
        (x) => x.categoria == createCategoriaDto.categoria,
      );

      if (categoriaExistent) {
        throw new UnauthorizedException('conta ja existe');
      }
    }

    const createCategoria = await this.prisma.categoria
      .create({ data })
      .catch((e) => {
        if (e instanceof PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            throw new UnauthorizedException('Categoria ja existe');
          }
        }
      });
    if (createCategoria) {
      throw new HttpException(
        'Categoria criada com sucesso!',
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'Categoria não cadastrado! Erro ao acessar o banco de dados...',
        HttpStatus.FOUND,
      );
    }
  }

  async findAll(user: User) {
    const getCategorias = await this.prisma.categoria
      .findMany({
        where: { tenantUuid: user.tenantUuid },
      })
      .catch((e) => {
        if (e instanceof PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            throw new UnauthorizedException('Busca no banco de dados falhou');
          }
        }
      });
    if (getCategorias) {
      return getCategorias;
    } else {
      throw new HttpException(
        'Categoria não cadastrado! algo de errado aconteceu...',
        HttpStatus.FOUND,
      );
    }
  }

  async findOne(id: string, user: User) {
    const getCategoria = await this.prisma.categoria
      .findUnique({ where: { uuid: id }, })
      .catch((e) => {
        if (e instanceof PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            throw new UnauthorizedException('Busca no banco de dados falhou');
          }
        }
      });

    if (getCategoria && user.tenantUuid === getCategoria.tenantUuid) {
      return getCategoria;
    } else {
      throw new HttpException(
        'Busca no banco de dados falhou',
        HttpStatus.FOUND,
      );
    }
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto, user: User) {
    const { categoria } = updateCategoriaDto;
    const data = {
      categoria,
    };

    if (this.methodsService.checkUser(user.tenantUuid, id, 'categoria')) {
      const updateCategoria = await this.prisma.categoria
        .update({ where: { uuid: id }, data })
        .catch((e) => {
          if (e instanceof PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              throw new UnauthorizedException('Categoria não existe');
            }
          }
        });
      if (updateCategoria) {
        throw new HttpException(
          'Categoria alterada com sucesso!',
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          'Categoria não cadastrado! Erro ao gravar no banco de dados.',
          HttpStatus.FOUND,
        );
      }
    } else {
      throw new HttpException(
        'Categoria não deletada! Erro ao acessar banco de dados',
        HttpStatus.FOUND,
      );
    }
  }

  async remove(id: string, user: User) {
    if (this.methodsService.checkUser(user.tenantUuid, id, 'categoria')) {
      const deleteCategoria = await this.prisma.categoria
        .delete({ where: { uuid: id } })
        .catch((e) => {
          if (e instanceof PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              throw new UnauthorizedException(
                'Erro ao deletar categoria, tente novamente !',
              );
            }
          }
        });
      if (deleteCategoria) {
        throw new HttpException(
          'Categoria deletada com sucesso!',
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          'Categoria não deletada! Erro ao acessar banco de dados',
          HttpStatus.FOUND,
        );
      }
    } else {
      throw new HttpException(
        'Categoria não deletada! Erro ao acessar banco de dados',
        HttpStatus.FOUND,
      );
    }
  }
}
