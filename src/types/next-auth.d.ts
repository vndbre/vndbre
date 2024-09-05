import type { AuthInfo } from '@/api/models/authInfo';

declare module 'next-auth' {

  /** User object returned by `authorize` method. */
  type User = Omit<DefaultUser, 'id' | 'name' | 'email' | 'image'> & {
    user: AuthInfo;
  };

  /**
   * Returned by `useSession` and `getSession`.
   * Also received as a prop on the `SessionProvider` React Context.
   */
  interface Session {

    /** User. */
    user?: AuthInfo;
  }
}
