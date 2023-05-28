import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/app/store';

type messagesState = {
  newNumber: string;
  writtingMessage: string;
};

const initialState: messagesState = {
  newNumber: '',
  writtingMessage: '',
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setNewNumber: (state, action: PayloadAction<string>) => {
      state.newNumber = action.payload;
    },
    setWrittingMessage: (state, action: PayloadAction<string>) => {
      state.writtingMessage = action.payload;
    },
  },
});

export const { setNewNumber, setWrittingMessage } = messagesSlice.actions;

export const selectNewNumber = (state: RootState) => state.messages.newNumber;
export const selectWrittingMessage = (state: RootState) =>
  state.messages.writtingMessage;

export default messagesSlice.reducer;
