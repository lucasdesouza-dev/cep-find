import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Categoria } from '../entities/categoria.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCategoriaDto extends Categoria {
  @IsOptional()
  @IsString()
  uuid: string;
  @ApiProperty({
    description: 'categoria para definição ',
    example: 'Moradia',
  })
  @IsString()
  categoria: string;

  @ApiProperty({
    required: false,
    description: 'subCategoria da categoria em vigor.',
    example: { subCategoriadescricao: 'automovel' },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  // @Type(() => CreateSubCategoriaDto)
  // subCategoria: CreateSubCategoriaDto;
  @IsOptional()
  @IsString()
  tenantUuid?: string;
}
