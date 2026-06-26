
export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly status: string;
  public readonly errors?: Record<string, string>

  constructor(msg: string, statusCode: number , errors?: Record<string, string>) {
    super();
    this.message = msg;
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.errors = errors
  }
}
