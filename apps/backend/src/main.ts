import { Logger, ShutdownSignal, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
// import helmet from 'helmet';

import { LoggerService } from 'modules/logger/logger.service';
import { Mode } from 'modules/config/mode';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  let app: INestApplication | null = null;
  let loggerService: LoggerService | null = null;

  try {
    app = await NestFactory.create(AppModule);

    app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGINT]);

    const configService = app.get(ConfigService);
    const nestLogger = app.get(Logger);
    loggerService = app.get(LoggerService);

    if (configService.get('mode') > Mode.PRODUCTION) {
      app.enableCors();
    }

    // TODO: настроить когда задеплоим
    // app.use(
    //   helmet.contentSecurityPolicy({
    //     directives: {
    //       defaultSrc: ["'self'"],
    //       styleSrc: ["'self'", "'unsafe-inline'"],
    //       // TODO: нужно убрать из scriptSrc "'unsafe-inline'"
    //       scriptSrc: ["'self'", "'unsafe-inline'"],
    //       connectSrc: ["'self'"],
    //       mediaSrc: ["'self'"],
    //       imgSrc: ["'self'"],
    //       upgradeInsecureRequests: true,
    //     },
    //   })
    // );
    // app.use(
    //   helmet.frameguard({
    //     action: 'deny',
    //   })
    // );
    // app.use(helmet.noSniff());

    app.use(cookieParser());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    const port = configService.get('api.port');
    const host = configService.get('api.interface');

    await app.listen(port, host, () => {
      nestLogger.log(`Application listening on port ${port}`, 'NestApplication');

      if (loggerService) {
        loggerService.log(`Application listening on port ${port}`, LoggerService.context.Application);
      }
    });
  } catch (error) {
    if (loggerService) {
      loggerService.critical(error, LoggerService.context.Application);
    } else {
      console.error(error);
    }

    if (app) {
      app.close();
    } else {
      process.exit(100);
    }
  }
}

bootstrap();
