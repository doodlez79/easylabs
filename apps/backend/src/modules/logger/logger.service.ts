/* eslint-disable no-dupe-class-members */ // Отключено т.к. в классе LoggerService описана перегрузка
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

export enum LogLevel {
  Emergency = 0,
  Alert,
  Critical,
  Error,
  Warning,
  Notice,
  Info,
  Debug,
}

export enum LogContext {
  Application = 'Application',
  ExceptionFilter = 'Exception Filter',
}

@Injectable()
export class LoggerService {
  private readonly stdout: boolean;

  public static readonly context = LogContext;

  public constructor(private readonly configService: ConfigService, private readonly nestLogger: Logger) {
    this.stdout = Boolean(configService.get('logger.stdout'));
  }

  private write(
    message: string,
    lvl: LogLevel,
    context: LogContext | string | undefined,
    extra?: { stack?: string }
  ): void {
    if (this.stdout) {
      const extraMessage = extra ? { ...extra, message, lvl } : message;

      if (lvl <= LogLevel.Error) {
        this.nestLogger.error(extraMessage, (extra || {}).stack, context);
      } else if (lvl === LogLevel.Warning) {
        this.nestLogger.warn(extraMessage, context);
      } else if (lvl <= LogLevel.Info) {
        this.nestLogger.log(extraMessage, context);
      } else if (lvl >= LogLevel.Debug) {
        this.nestLogger.debug(extraMessage, context);
      }
    }
  }

  private logMessage(level: LogLevel, error: Error, context: string, extra?: object): void;

  private logMessage(level: LogLevel, message: string, context: LogContext, extra?: object): void;

  private logMessage(
    level: LogLevel,
    errorOrMessage: Error | string,
    context?: LogContext | string,
    extra?: object
  ): void;

  private logMessage(
    level: LogLevel,
    errorOrMessage: Error | string,
    context?: LogContext | string,
    extra?: object
  ): void {
    let message = errorOrMessage as string;
    let obj = extra;

    if (typeof errorOrMessage === 'object' && !Array.isArray(errorOrMessage)) {
      message = errorOrMessage.message || 'Error without msg';
      obj = errorOrMessage;
      Object.assign(obj, extra);
    }

    this.write(message, level, context, obj);
  }

  public debug(message: string, context: LogContext, extra?: object): void {
    return this.logMessage(LogLevel.Debug, message, context, extra);
  }

  public log(message: string, context: LogContext, extra?: object): void {
    return this.logMessage(LogLevel.Info, message, context, extra);
  }

  public warn(message: string, context: LogContext, extra?: object): void {
    return this.logMessage(LogLevel.Warning, message, context, extra);
  }

  public error(error: string | Error, context: LogContext, extra?: object): void {
    return this.logMessage(LogLevel.Error, error, context, extra);
  }

  public critical(error: string | Error, context: LogContext, extra?: object): void {
    return this.logMessage(LogLevel.Critical, error, context, extra);
  }
}
