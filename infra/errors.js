export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno inesperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o Suporte.";
    this.statusCode = 500;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
