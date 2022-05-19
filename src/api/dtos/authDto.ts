export namespace AuthDto {

  /** User secret dto. */
  export interface UserSecret {

    /** Session token. */
    readonly sessiontoken: string;
  }

  /** Data required for login. */
  export interface Login {

    /** Username. */
    readonly username: string;

    /** Password. */
    readonly password: string;
  }
}
