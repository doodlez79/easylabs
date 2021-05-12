import { Module, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { configInit } from 'modules/config/init';
import { LoggerModule } from 'modules/logger/logger.module';
import { LoggerService } from 'modules/logger/logger.service';
import { SettingsModule } from 'modules/settings/settings.module';

@Module({
  imports: [
    LoggerModule,
    SettingsModule,
    ConfigModule.forRoot(configInit()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'report/build'),
      renderPath: new RegExp(/^\/report\/*$/),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'designer/build'),
      renderPath: new RegExp(/^\/designer\/*$/),
    }),
  ],
})
export class AppModule implements OnApplicationShutdown, OnModuleDestroy {
  private constructor(private readonly logger: LoggerService) {}

  public onModuleDestroy(): void {
    this.logger.log('Application shutdown', LoggerService.context.Application);
  }

  public onApplicationShutdown(): Promise<void> {
    return Promise.resolve(this.logger.log('***Windows XP goodbye sound***', LoggerService.context.Application));
  }
}
