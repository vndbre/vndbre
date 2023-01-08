import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connect, commandFactory } from 'src/server/legacy/api';
import * as z from 'zod';

const userSchema = z.object({
  name: z.string(),
  token: z.string(),
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials, _req) {
        if (credentials?.password == null || credentials.username == null) {
          throw new Error('увы');
        }

        const data = await connect((commandFactory.login(
          credentials.username,
          credentials.password,
        )));
        const status: string | undefined = data.split(' ')[0];

        if (status === 'session') {
          const token = data.split(' ')[1];

          if (token == null) {
            throw new Error('увы');
          }

          return {
            user: {
              token,
              name: credentials.username,
            },
          };
        }

        if (status === 'error') {
          throw new Error('увы');
        }

        return null;
      },
    }),
  ],

  /** TODO: regenerate secret and move out to env variable. */
  secret: 'XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      if (session.user != null) {
        const user = userSchema.parse(token.user);
        session.user.name = user.name;
        session.user.token = user.token;
      }

      return session;
    },
  },
});
