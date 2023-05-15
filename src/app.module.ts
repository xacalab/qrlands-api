import { Module } from '@nestjs/common';

import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { RealtorModule } from '@api/realtor';
import { CommonModule } from '@api/common';
import { AuthModule } from '@api/auth';

@Module({
  imports: [CommonModule, AuthModule, RealtorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
