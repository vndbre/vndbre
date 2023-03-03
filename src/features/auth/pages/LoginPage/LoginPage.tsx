/* eslint-disable max-len */
import { useState, useCallback, useRef } from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { Layout } from 'src/components/Layout/Layout';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';

// import loginGuideDesktopImage from 'public/assets/login-guide-desktop.png';
// import loginGuideTabletImage from 'public/assets/login-guide-tabletop.png';
import loginGuideMobileImage from 'public/assets/login-guide-mobile.png';
import { Tabs } from 'src/components/Tabs';
import type { TypeOf } from 'zod';
import { z } from 'zod';
import { LoginTextGuide } from '../../components/LoginTextGuide/LoginTextGuide';
import type { LoginFormData } from '../../components/LoginForm/LoginForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

const tabsSchema = z.enum(['text', 'visual']);

type TabValue = TypeOf<typeof tabsSchema>;

const TAB_TO_READABLE_MAP: Record<TabValue, string> = {
  text: 'Text guide',
  visual: 'Visual guide',
};

const tabValues = Object.keys(TAB_TO_READABLE_MAP) as readonly TabValue[];

/** Login page. */
export const LoginPage: NextPage = () => {
  const router = useRouter();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSubmit, setLoginSubmit] = useState(false);
  const [tab, setTab] = useState<TabValue>('text');
  const carouselRef = useRef<HTMLDivElement | null>(null);

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

  const handleTabChange = useCallback((value: string) => {
    const selectedTab = tabsSchema.parse(value);
    setTab(selectedTab);

    if (carouselRef.current == null) {
      return;
    }

    const carouselWidth = carouselRef.current.offsetWidth;

    if (selectedTab === 'text') {
      carouselRef.current.scrollBy({ left: -carouselWidth, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({ left: carouselWidth, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Head>
        <title>vndbre - Login page</title>
        <meta name="description" content="vndbre" />
      </Head>

      <Layout>
        {/* <div className="mx-auto w-[360px] md:w-[435px] xl:w-[1232px]">
          <div className="flex w-full flex-col items-center xl:gap-16 xl:pt-14">
            <h1 className="text-[48px] font-bold leading-[48px] tracking-tight md:invisible md:text-[0px] md:leading-[0px] xl:visible xl:text-[48px] xl:leading-[48px]">Log In</h1>
            <div className="grid gap-8 xl:grid-cols-[733px_435px] xl:gap-20">
              <picture className="col-span-full row-start-1 ">
                <source srcSet={loginGuideDesktopImage.src} media="(min-width: 1280px)" />
                <source srcSet={loginGuideTabletImage.src} media="(min-width: 768px)" />
                <source srcSet={loginGuideMobileImage.src} media="(max-width: 767px)" />
                <Image src={loginGuideDesktopImage} alt="" className="md:rounded-xl" />
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
        </div> */}

        <div>
          <Tabs.Root
            asChild
            activationMode="manual"
            value={tab}
            onValueChange={handleTabChange}
          >
            <Tabs.List className="justify-center">
              {tabValues.map(tabValue => (
                <Tabs.Tab
                  key={tabValue}
                  value={tabValue}
                >
                  {TAB_TO_READABLE_MAP[tabValue]}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>

        <div className="flex flex-nowrap overflow-x-auto" ref={carouselRef}>
          <div className="w-full flex-none">
            <LoginTextGuide />
          </div>
          <div className="flex w-full flex-none justify-center">
            <Image src={loginGuideMobileImage} alt="" className="h-min flex-none self-end" />
          </div>
        </div>
        <LoginForm onSubmit={handleFormSubmit} isSubmitting={loginSubmit} />
        {loginError && (
          <div role="alert" className="text-caption-18 grid min-h-[48px] place-items-center rounded-md bg-red-50 p-3 text-center font-medium text-red-500">
            {loginError}
          </div>
        )}
      </Layout>
    </>
  );
};
