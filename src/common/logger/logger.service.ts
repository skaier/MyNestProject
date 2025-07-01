import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logFilePath = path.join(__dirname, '../../../logs/requests.log');

  private ensureLogFileExists() {
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, '');
    }
  }

  log(message: string) {
    this.ensureLogFileExists();
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFilePath, `[${timestamp}] ${message}\n`);
  }

  error(message: string, trace: string) {
    this.ensureLogFileExists();
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFilePath, `[${timestamp}] ERROR: ${message}\n${trace}\n`);
  }

  warn(message: string) {
    this.ensureLogFileExists();
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFilePath, `[${timestamp}] WARN: ${message}\n`);
  }

  debug?(message: string) {
    this.ensureLogFileExists();
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFilePath, `[${timestamp}] DEBUG: ${message}\n`);
  }

  verbose?(message: string) {
    this.ensureLogFileExists();
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFilePath, `[${timestamp}] VERBOSE: ${message}\n`);
  }
}