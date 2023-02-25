import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userSchema } from 'src/api/models/user';
import * as z from 'zod';

const authInfoDtoSchema = z.object({
  id: z.string(),
  username: z.string(),
  permissions: z.array(z.enum(['listread', 'listwrite'])),
});

const permissionsMap = {
  listread: 'read',
  listwrite: 'write',
} as const;

const credentialsSchema = z.object({
  token: z.string().min(1),
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        token: { type: 'text' },
      },
      async authorize(credentials, _req) {
        const { token } = credentialsSchema.parse(credentials);

        const response = await fetch('https://api.vndb.org/kana/authinfo', {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const authInfoDto = await response.json();
          const authInfo = authInfoDtoSchema.parse(authInfoDto);

          return {
            user: {
              id: authInfo.id,
              token,
              name: authInfo.username,
              permissions: authInfo.permissions.map(permission => permissionsMap[permission]),
            },
          };
        }

        const errorMessage = await response.text();
        throw new Error(errorMessage);
      },
    }),
  ],
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
        session.user.id = user.id;
        session.user.permissions = user.permissions;
      }

      return session;
    },
  },
});
