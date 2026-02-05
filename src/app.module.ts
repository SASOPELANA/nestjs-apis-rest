import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { HelloModule } from './hello/hello.module';

import { LoggerMiddleware } from './utils/logger/logger.middleware';
import { MiddLoggerMiddleware } from './users/midd-logger/midd-logger.middleware';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    HelloModule,
    ProductsModule,
  ],
  controllers: [HelloController],
  providers: [HelloService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(MiddLoggerMiddleware)
      .forRoutes({
        path: '/api/users',
        method: RequestMethod.POST,
      });
  }
}
