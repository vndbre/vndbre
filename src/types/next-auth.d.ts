import type { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {

  /** User object returned by `authorize` method. */
  type User = Omit<DefaultUser, 'id' | 'name' | 'email' | 'image'> & {
    user: {
      id: string;
      name: string;
      token: string;
      permissions: ('read' | 'write')[];
    };
  };

  /**
   * Returned by `useSession` and `getSession`.
   * Also received as a prop on the `SessionProvider` React Context.
   */
  interface Session {

    /** User. */
    user?: {

      /** ID. */
      id: string;

      /** API token. */
      token: string;

      /**
       * Permissions of the token.
       * `read` - Allows read access to private labels and entries in the user’s visual novel list.
       * `write` - Allows write access to the user’s visual novel list.
       */
      permissions: ('read' | 'write')[];
    } & DefaultSession['user'];
  }
}
