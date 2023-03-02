import { useState, useCallback } from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { Layout } from 'src/components/Layout/Layout';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import loginGuideDesktopImage from 'public/assets/login-guide-desktop.png';
import loginGuideTabletImage from 'public/assets/login-guide-tabletop.png';
import { LoginTextGuide } from '../../components/LoginTextGuide/LoginTextGuide';
import type { LoginFormData } from '../../components/LoginForm/LoginForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

/** Login page. */
export const LoginPage: NextPage = () => {
  const router = useRouter();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSubmit, setLoginSubmit] = useState(false);

  const handleFormSubmit = useCallback(async(data: LoginFormData) => {
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
        <div className="mx-auto w-[435px] xl:w-[1232px]">
          <div className="flex w-full flex-col items-center xl:gap-16 xl:pt-14">
            <h1 className="invisible text-[0px] leading-[0px] xl:visible xl:text-[48px] xl:font-bold xl:leading-[48px] xl:tracking-tight">Log In</h1>
            <div className="grid gap-8 xl:grid-cols-[733px_435px] xl:gap-20">
              <picture className="col-span-full row-start-1 ">
                <source srcSet={loginGuideDesktopImage.src} media="(min-width: 1280px)" />
                <source srcSet={loginGuideTabletImage.src} media="(max-width: 1279px)" />
                <Image src={loginGuideDesktopImage} alt="" className="rounded-xl" />
              </picture>
              <div className="flex flex-col gap-8 xl:col-start-2 xl:row-start-1 xl:gap-10">
                <LoginTextGuide />
                <div className="flex flex-col gap-6">
                  <LoginForm onSubmit={handleFormSubmit} isSubmitting={loginSubmit} />
                  {loginError && (
                    <div role="alert" className="text-caption-18 grid min-h-[48px] place-items-center rounded-md bg-red-50 p-3 text-center font-medium text-red-500">
                      {loginError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
