import NextAuth from 'next-auth';
import { authOptions } from '@/api/authOptions';

export default NextAuth(authOptions);
