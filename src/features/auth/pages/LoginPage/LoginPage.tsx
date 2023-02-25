import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { Layout } from 'src/components/Layout/Layout';
import { Button } from 'src/components/Button/Button';
import { ControlWrapper } from 'src/components/ControlWrapper/ControlWrapper';
import type { TypeOf } from 'zod';
import { Validators } from 'src/api/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { TextInput } from 'src/components/TextInput/TextInput';
import { Field } from 'src/components/Field/Field';

const loginFormInitialValues = {
  token: '',
};

const validationSchema = z.object({
  token: z.string().min(1, { message: Validators.REQUIRED_ERROR_MESSAGE }),
});

type FormData = TypeOf<typeof validationSchema>;

/** Login page. */
export const LoginPage: NextPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
  } = useForm({ defaultValues: loginFormInitialValues, resolver: zodResolver(validationSchema) });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSubmit, setLoginSubmit] = useState(false);

  const handleFormSubmit = useCallback(async(data: FormData) => {
    setLoginError(null);
    setLoginSubmit(true);
    const response = await signIn('credentials', { ...data, redirect: false });
    if (response?.ok === false) {
      setLoginError(response.error ?? null);
    }

    if (response?.ok === true) {
      router.push('/profile/overview');
    }

    setLoginSubmit(false);
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
              <ControlWrapper label="Token">
                <Field
                  Component={TextInput}
                  control={control}
                  name="token"
                  placeholder="Enter your vndb.org token"
                />
              </ControlWrapper>

              {loginError && (
                <div role="alert" className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium leading-6 text-red-500">
                  {loginError}
                </div>
              )}

              <div className="flex flex-col">
                <Button type="submit" isDisabled={loginSubmit}>Continue</Button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};
