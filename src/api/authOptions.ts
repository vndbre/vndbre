import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { api } from './apiClient';
import { authInfoDtoSchema } from './dtos/authInfoDto';
import { AuthInfoMapper } from './mappers/authInfoMapper';
import { authInfoSchema } from './models/authInfo';

const credentialsSchema = z.object({
  token: z.string().min(1),
});

export const authOptions: AuthOptions = {
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
};
