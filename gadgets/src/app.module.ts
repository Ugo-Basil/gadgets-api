import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'config';
import { AllExceptionFilter } from './httpExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  imports: [
    MongooseModule.forRoot(config.get('mongodbUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      w: 1,
      keepAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
