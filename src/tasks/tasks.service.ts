import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getByTasks(id: number): Task | undefined {
    const resTask = this.tasks.find((task) => task.id === id);

    if (!resTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return resTask;
  }

  createTasks(task: Task): Task {
    console.log(task);
    this.tasks.push({
      ...task,
      id: this.tasks.length + 1,
    });
    return task;
  }

  updateTasks(): string {
    return 'Actualizar todos los campos de una tarea.';
  }

  patchTasks(): string {
    return 'Actualizar el campo de una tarea.';
  }

  deleteTasks(): string {
    return 'Eliminando tarea';
  }
}
