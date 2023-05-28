import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/app/store';

export type IAuthFormData = {
  idInstance: string;
  apiTokenInstance: string;
};
type authState = {
  authFormData: IAuthFormData;
};
const initialState: authState = {
  authFormData: {
    idInstance: '',
    apiTokenInstance: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthFormData: (state, action: PayloadAction<IAuthFormData>) => {
      state.authFormData = action.payload;
    },
  },
});

export const { setAuthFormData } = authSlice.actions;

export const selectAuthFormData = (state: RootState) => state.auth.authFormData;

export default authSlice.reducer;
