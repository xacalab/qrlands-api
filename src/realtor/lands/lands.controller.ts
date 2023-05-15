import { EntityNotFoundError } from 'typeorm';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { GetPublicInfoParams } from '@api/realtor/lands/domain';
import { LandsService } from '@api/realtor/lands';

@Controller('lands')
export class LandsController {
  constructor(private readonly service: LandsService) {}

  @Get(':id')
  getLandPublicInfo(@Param() { id }: GetPublicInfoParams) {
    return this.service.getLandPublicInfo(id).catch((error) => {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException({}, HttpStatus.NOT_FOUND);
      }

      throw error;
    });
  }
}
