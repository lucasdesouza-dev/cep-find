/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MethodsService {
  constructor(private readonly prisma: PrismaService) { }
  async checkUser(userTenant, id, tabela) {
    //@ts-ignore
    const item = await this.prisma[tabela].findUnique({
      where: { uuid: id },
    });
    const tenantUuidItem = item.tenantUuid;
    const aprovado = userTenant === tenantUuidItem;

    return aprovado;
  }
}
