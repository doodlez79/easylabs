import { Global, Module, Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
  exports: [LoggerService],
  providers: [LoggerService, Logger],
})
export class LoggerModule {}
