// * Controller is similar to the Router;

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // * This decorator is similar to express.router.get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
