import type { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {

  /** User object returned by `authorize` method. */
  type User = Omit<DefaultUser, 'id' | 'name' | 'email' | 'image'> & {
    user: {
      name: string;
      token: string;
    };
  };

  /**
   * Returned by `useSession` and `getSession`.
   * Also received as a prop on the `SessionProvider` React Context.
   */
  interface Session {

    /** User. */
    user?: {

      /** Session token. */
      token: string;
    } & DefaultSession['user'];
  }
}
