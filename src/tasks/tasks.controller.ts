import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './dto/create-taks.dto';

@Controller('/api')
export class TasksController {
  tasksService: TasksService;

  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get('/tasks')
  getAllTasks(@Query() query: any) {
    console.log(query);
    return this.tasksService.getTasks();
  }

  @Get('/tasks/:id')
  getByTasks(@Param('id') id: string) {
    return this.tasksService.getByTasks(Number(id));
  }

  @Post('/tasks')
  createTasks(@Body() task: Task): unknown {
    console.log(task);
    return this.tasksService.createTasks(task);
  }

  @Put('/tasks')
  updateTasks() {
    return this.tasksService.updateTasks();
  }

  @Patch('/tasks')
  patchTasks() {
    return this.tasksService.patchTasks();
  }

  @Delete('/tasks')
  deleteTasks() {
    return this.tasksService.deleteTasks();
  }
}
