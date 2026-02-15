type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}]: ${message}`;
  }

  public info(message: string): void {
    console.info(this.formatMessage("INFO", message));
  }

  public warn(message: string): void {
    console.warn(this.formatMessage("WARN", message));
  }

  public error(message: string, error?: Error): void {
    const formatted = this.formatMessage("ERROR", message);
    console.error(formatted, error ? `\nStack: ${error.stack}` : "");
  }
}

export const logger = Logger.getInstance();
