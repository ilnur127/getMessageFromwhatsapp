import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import MainLayout from '@/components/layouts/MainLayout';

import type { NextPage } from 'next';
import type { IAuthFormData } from '@/redux/features/auth/authSlice';

const HomePage = () => {
  const [authFormData] = useLocalStorage<IAuthFormData>('authFormData');

  const router = useRouter();

  useEffect(() => {
    if (authFormData) {
      router.push('/messages');
    } else {
      router.push('/auth');
    }
  }, [authFormData, router]);

  return <></>;
};

const Home: NextPage = (): JSX.Element => (
  <>
    <Head>
      <title>Home page</title>
      <meta name="description" content="Home page" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/images/logo.svg" />
      <base href="/" />
    </Head>
    <MainLayout>{HomePage()}</MainLayout>
  </>
);

export default Home;
