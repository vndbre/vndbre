import type { FC } from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { signIn, signOut } from 'next-auth/react';
import { Layout } from 'src/components/Layout/Layout';
import { Button } from 'src/components/Button/Button';
import { TextInput } from 'src/components/controls/TextInput';
import { ControlWrapper } from 'src/components/controls/ControlWrapper';
import { Link } from 'src/components/Link/Link';
import { PasswordInput } from 'src/components/controls/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginFormInitialValues = {
  username: '',
  password: '',
};

const validationSchema = z.object({
  username: z.string(),
  password: z.string(),
});

/** Login page. */
const LoginPage: FC = () => {
  const {
    control,
    handleSubmit,
  } = useForm({ defaultValues: loginFormInitialValues, resolver: zodResolver(validationSchema) });

  const handleFormSubmit = useCallback(async(data: typeof loginFormInitialValues) => {
    const response = await signIn('credentials', { username: data.username, password: data.password, redirect: false });
    if (response?.ok === false) {
      console.log(response.error);
    }

    if (response?.ok === true) {
      console.log(response);
    }
  }, []);

  return (
    <>
      <Head>
        <title>vndbre - Login page</title>
        <meta name="description" content="vndbre" />
      </Head>

      <Layout>
        <Button onClick={() => signOut()}>Log out</Button>
        <div className="mx-auto w-96">
          <div className="flex w-full flex-col items-center gap-8 pt-32">
            <h1 className="text-[48px] font-bold leading-8 tracking-tight">Log In</h1>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex w-full flex-col gap-8">
              <ControlWrapper label="Username">
                <TextInput control={control} name="username" placeholder="Enter vndb.org username" />
              </ControlWrapper>

              <div className="flex flex-col gap-2">
                <ControlWrapper label="Password">
                  <PasswordInput control={control} name="password" placeholder="Enter vndb.org password" />
                </ControlWrapper>
                <Link href="https://vndb.org/u/newpass" external className="w-min text-sm leading-6">Forgot password?</Link>
              </div>

              <div className="flex flex-col gap-2">
                <Button type="submit">Continue</Button>
                <span className="text-center">
                  Don&apos;t have an account?
                  {' '}
                  <Link href="https://vndb.org/u/register" external>Sign Up</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
