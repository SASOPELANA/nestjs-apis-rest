import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [TasksModule, ProjectsModule, AuthModule, UsersModule, HelloModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule {}
