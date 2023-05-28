import React from 'react';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';

import { store } from '../redux/app/store';

import type { AppProps } from 'next/app';
import type { TypeOptions } from 'react-toastify';

import '../styles/globals.css';

const ToastContainer = dynamic(
  () =>
    import('react-toastify').then((comps) => ({
      default: comps.ToastContainer,
    })),
  { suspense: true }
);

type IContextClassType = {
  [cypher in TypeOptions]: string;
};
const contextClass: IContextClassType = {
  success: 'alertBlock_success',
  error: 'alertBlock_error',
  info: 'alertBlock_info',
  warning: 'alertBlock_warning',
  default: 'alertBlock_default',
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
    <ToastContainer
      toastClassName={(toastInfo) =>
        `${contextClass[toastInfo?.type || 'default']} alertBlock`
      }
      bodyClassName={() => 'alertBlock__body'}
      className="alertComponent"
      position="bottom-left"
      autoClose={5000}
      role="alert"
      hideProgressBar={true}
    />
  </Provider>
);

export default MyApp;
