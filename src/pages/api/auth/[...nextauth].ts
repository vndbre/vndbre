import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from 'src/api/apiClient';
import { authInfoDtoSchema } from 'src/api/dtos/authInfoDto';
import { AuthInfoMapper } from 'src/api/mappers/authInfoMapper';
import { authInfoSchema } from 'src/api/models/authInfo';
import * as z from 'zod';

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

        const data = await api
          .auth(`Token ${token}`)
          .get('authinfo')
          .json();
        const userInfoDto = authInfoDtoSchema.parse(data);

        return {
          user: AuthInfoMapper.fromDto(userInfoDto, token),
        };
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
        const auth = authInfoSchema.parse(token.user);
        session.user.name = auth.name;
        session.user.token = auth.token;
        session.user.id = auth.id;
        session.user.permissions = auth.permissions;
      }

      return session;
    },
  },
});
