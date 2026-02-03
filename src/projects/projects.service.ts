import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  index() {
    return 'APIs REST con Nest.js';
  }
}
