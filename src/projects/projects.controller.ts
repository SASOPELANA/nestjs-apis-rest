import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProjectsController {
  @Get('/')
  index() {
    return 'APIs REST con Nest.js';
  }
}
