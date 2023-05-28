import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetNotificationQuery,
  useDeleNotificationMutation,
  usePostMessageMutation,
} from '@/redux/features/messages/messagesApiSlice';
import {
  selectNewNumber,
  selectWrittingMessage,
  setNewNumber,
  setWrittingMessage,
} from '@/redux/features/messages/messagesSlice';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import MainLayout from '@/components/layouts/MainLayout';

import type { NextPage } from 'next';
import type { IAuthFormData } from '@/redux/features/auth/authSlice';

import classes from './messages.module.css';

const Loader = dynamic(() => import('@/components/UI/Loader'));

const MessagesContent = ({
  authFormData,
}: {
  authFormData: IAuthFormData;
}): JSX.Element => {
  const dispatch = useDispatch();

  const [isWrittingMessageMode, setIsWrittingMessageMode] = useState(false);

  const newNumber = useSelector(selectNewNumber);
  const writtingMessage = useSelector(selectWrittingMessage);

  /* Удаление уведомления */
  const [
    deleNotification,
    { isLoading: isDeleting, isError: isDeletedError, error: deletedError },
  ] = useDeleNotificationMutation();

  if (isDeletedError) {
    toast.error(JSON.stringify(deletedError));
    console.error(deletedError);
  }

  const deleNotificationFunction = useCallback(
    async (receiptId: number) => {
      try {
        deleNotification({ ...authFormData, receiptId });
      } catch (e) {
        toast.error(JSON.stringify(e));
        console.error(e);
      }
    },
    [authFormData, deleNotification]
  );
  /* ------ */

  /* Получение уведомления */
  const {
    data: notificationData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetNotificationQuery(authFormData);

  if (
    isSuccess &&
    notificationData.body.typeWebhook !== 'incomingMessageReceived' &&
    !isDeleting
  ) {
    deleNotificationFunction(notificationData.receiptId);
  }

  if (isError) {
    toast.error(JSON.stringify(error));
    console.error(error);
  }
  /* ------ */

  /* Получение сообщения */
  const [
    postMessage,
    { isLoading: isPosting, isError: isPostedError, error: postedError },
  ] = usePostMessageMutation();

  if (isPostedError) {
    toast.error(JSON.stringify(postedError));
    console.error(postedError);
  }

  const postMessageFunction = useCallback(async () => {
    try {
      if (newNumber && writtingMessage) {
        await postMessage({
          ...authFormData,
          number: newNumber,
          text: writtingMessage,
        }).unwrap();
        dispatch(setWrittingMessage(''))
        toast.success('Сообщение отправлено');
      } else {
        toast.error('Не указан телефон или текст сообщения');
      }
    } catch (e) {
      toast.error(JSON.stringify(e));
      console.error(e);
    }
  }, [authFormData, newNumber, writtingMessage, postMessage]);
  /* ------ */

  return (
    <>
      {(isLoading || isPosting || isDeleting) && <Loader />}
      <div className={classes.messagesBlock}>
        <aside>
          <div className={classes.messagesBlock__asideHeader}>
            <input
              value={newNumber}
              onChange={(e) => dispatch(setNewNumber(e.target.value))}
              placeholder="79999999999"
            />
            <button onClick={() => newNumber && setIsWrittingMessageMode(true)}>
              Создать чат
            </button>
          </div>
          {isSuccess &&
            notificationData &&
            notificationData.body &&
            notificationData.body.senderData &&
            notificationData.body.messageData && (
              <div className={classes.messagesBlock__message}>
                <div>
                  <h4>{notificationData.body.senderData.chatName}</h4>
                  <span>
                    {notificationData.body.messageData.typeMessage ===
                    'textMessage'
                      ? notificationData.body.messageData.textMessageData
                          .textMessage
                      : 'Не текст'}
                  </span>
                </div>
                <button
                  onClick={() =>
                    deleNotificationFunction(notificationData.receiptId)
                  }
                >
                  Прочитано
                </button>
              </div>
            )}
        </aside>
        <div>
          {isWrittingMessageMode && (
            <>
              <div className={classes.messagesBlock__chat_number}>
                {newNumber}
              </div>
              <div className={classes.messagesBlock__chat_textBlock}>
                <textarea
                  value={writtingMessage}
                  onChange={(e) => dispatch(setWrittingMessage(e.target.value))}
                />
                <button onClick={postMessageFunction}>Отправить</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const MessagesPage = (): JSX.Element => {
  const [authFormData] = useLocalStorage<IAuthFormData>('authFormData');

  return authFormData ? <MessagesContent authFormData={authFormData} /> : <></>;
};

const Messages: NextPage = (): JSX.Element => (
  <>
    <Head>
      <title>Messages page</title>
      <meta name="description" content="Messages page" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/images/logo.svg" />
      <base href="/" />
    </Head>
    <MainLayout>{MessagesPage()}</MainLayout>
  </>
);

export default Messages;
