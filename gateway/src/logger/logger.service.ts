import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService extends Logger {
  error(message: string, trace?: string) {
    super.error(message, trace);
  }
  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  log(message: any, context?: string) {
    super.log(message, context);
  }
}
