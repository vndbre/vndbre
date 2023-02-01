import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from 'src/components/Layout/Layout';
import { Button } from 'src/components/Button/Button';
import { TextInput } from 'src/components/controls/TextInput';
import { ControlWrapper } from 'src/components/controls/ControlWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Head from 'next/head';
import { Link } from 'src/components/Link/Link';
import { PasswordInput } from 'src/components/controls/PasswordInput';
import type { NextPage } from 'next';

const loginFormInitialValues = {
  username: '',
  password: '',
};

const validationSchema = z.object({
  username: z.string(),
  password: z.string(),
});

/** Login page. */
export const LoginPage: NextPage = () => {
  const {
    control,
    handleSubmit,
  } = useForm({ defaultValues: loginFormInitialValues, resolver: zodResolver(validationSchema) });

  const handleFormSubmit = useCallback((data: typeof loginFormInitialValues) => {
    console.log(data);
  }, []);

  return (
    <>
      <Head>
        <title>vndbre - Login page</title>
        <meta name="description" content="vndbre" />
      </Head>

      <Layout>
        <div className="mx-auto w-[360px]">
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
