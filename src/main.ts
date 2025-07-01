import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerModule } from '@/common/logger/logger.module';
import { LoggerService } from '@/common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    }),
  });

  // 注册日志模块
  await app.select(LoggerModule).get(LoggerModule);

  // 全局前缀
  app.setGlobalPrefix('api');

  // 启用CORS
  app.enableCors();

  // 自动验证请求数据
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // 全局拦截器
  const loggerService = app.get(LoggerService);
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggingInterceptor(loggerService)
  );

  // Swagger配置
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();