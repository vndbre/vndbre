/** Common application error. */
export class AppError extends Error {
  /** Error message. */
  public readonly message: string;

  /** Error status. */
  public readonly status?: number;

  public constructor(
    message: string,
    status?: number,
  ) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
