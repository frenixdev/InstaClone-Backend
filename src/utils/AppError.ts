export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;

  constructor(msg: string, statusCode: number) {
    super();
    this.message = msg;
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
  }
}
