import React, { useCallback } from 'react';
import Head from 'next/head';
// import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAuthFormData,
  setAuthFormData,
} from '@/redux/features/auth/authSlice';

import MainLayout from '@/components/layouts/MainLayout';

import type { NextPage } from 'next';
import type { FormEvent } from 'react';

import classes from './auth.module.css';

const HomeContent = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();

  const authFormData = useSelector(selectAuthFormData);

  const submitFormFunction = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (
        authFormData &&
        authFormData.idInstance &&
        authFormData.apiTokenInstance
      ) {
        localStorage.setItem('authFormData', JSON.stringify(authFormData));
        router.push('/messages');
      } else {
        toast.error('Не заполнены поля');
      }
    },
    [authFormData, router]
  );

  return (
    <div className={classes.authBlock}>
      <p>Введите данные из личного кабинета в поля ниже</p>
      <form onSubmit={submitFormFunction}>
        <div>
          <label htmlFor="">Уникальный номер аккаунта</label>
          <input
            value={authFormData.idInstance}
            onChange={(e) =>
              dispatch(
                setAuthFormData({ ...authFormData, idInstance: e.target.value })
              )
            }
          />
        </div>
        <div>
          <label htmlFor="">Ключ доступа аккаунта</label>
          <input
            value={authFormData.apiTokenInstance}
            onChange={(e) =>
              dispatch(
                setAuthFormData({
                  ...authFormData,
                  apiTokenInstance: e.target.value,
                })
              )
            }
          />
        </div>
        <button>Отправить</button>
      </form>
    </div>
  );
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
    <MainLayout>{HomeContent()}</MainLayout>
  </>
);

export default Home;
