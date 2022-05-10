/** Provides interfaces for required data for authorization. */
export namespace AuthData {

  /** User secret. */
  export interface UserSecret {

    /** Access token. */
    readonly token: string;
  }

  /** Data required for login. */
  export interface Login {

    /** Username. */
    readonly username: string;

    /** Password. */
    readonly password: string;
  }
}
