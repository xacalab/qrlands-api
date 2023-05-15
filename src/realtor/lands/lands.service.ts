import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Land } from '@api/realtor/models';

@Injectable()
export class LandsService {
  constructor(
    @InjectRepository(Land) private readonly landRepository: Repository<Land>,
  ) {}

  getLandPublicInfo(id: string) {
    const land = this.landRepository.findOneOrFail({ where: { id } });

    return land;
  }
}
