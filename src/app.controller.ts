import { Controller, Get } from '@nestjs/common';

import { AppService } from '@api/app.service';

@Controller('status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return this.appService.getStatus();
  }
}
