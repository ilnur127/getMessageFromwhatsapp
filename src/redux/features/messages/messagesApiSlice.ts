import { apiSlice } from '../api/apiSlice';

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNotification: build.query({
      query: ({
        idInstance,
        apiTokenInstance,
      }: {
        idInstance?: string;
        apiTokenInstance?: string;
      }) => `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      providesTags: [{ type: 'notification', id: 'LIST' }],
    }),
    deleNotification: build.mutation({
      query: ({
        idInstance,
        apiTokenInstance,
        receiptId,
      }: {
        idInstance?: string;
        apiTokenInstance?: string;
        receiptId: number;
      }) => ({
        url: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'notification', id: 'LIST' }],
    }),
    postMessage: build.mutation({
      query: ({
        idInstance,
        apiTokenInstance,
        number,
        text,
      }: {
        idInstance?: string;
        apiTokenInstance?: string;
        number: string;
        text: string;
      }) => ({
        url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: 'POST',
        body: {
          chatId: `${number}@c.us`,
          message: text,
        },
      }),
    }),
  }),
});
export const {
  useGetNotificationQuery,
  useDeleNotificationMutation,
  usePostMessageMutation,
} = messagesApiSlice;
