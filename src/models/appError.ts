/** Common application error. */
export class AppError extends Error {
  /** Error status. */
  public readonly status?: number;

  public constructor(
    message: string,
    status?: number,
  ) {
    super(message);
    this.status = status;
  }
}
