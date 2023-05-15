import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@api/common';
import { Module } from '@nestjs/common';

import { LandsController, LandsService } from '@api/realtor/lands';
import { Land } from '@api/realtor/models';

const typeormModule = TypeOrmModule.forFeature([Land]);

@Module({
  imports: [CommonModule, typeormModule],
  controllers: [LandsController],
  providers: [LandsService],
})
export class RealtorModule {}
