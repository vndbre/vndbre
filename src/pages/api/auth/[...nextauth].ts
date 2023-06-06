import NextAuth from 'next-auth';
import { authOptions } from 'src/api/authOptions';

export default NextAuth(authOptions);
