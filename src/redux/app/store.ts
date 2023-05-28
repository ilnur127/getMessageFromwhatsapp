import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import messagesReducer from '../features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    messages: messagesReducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
