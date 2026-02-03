import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { HelloModule } from './hello/hello.module';

import { LoggerMiddleware } from './utils/logger/logger.middleware';

@Module({
  imports: [TasksModule, ProjectsModule, AuthModule, UsersModule, HelloModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
