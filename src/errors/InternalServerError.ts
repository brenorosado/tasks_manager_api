export class InternalServerError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = 500;
  }
}