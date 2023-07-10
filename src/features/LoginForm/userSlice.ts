import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface userState {
  isLogged: boolean;
  userToken: string;
}

const initialState: userState = {
  isLogged: false,
  userToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogged = true;
      state.userToken = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.userToken = '';
    }
  }
});

export const { login, logout } = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectUserToken = (state: RootState) => state.user.userToken;

export default userSlice.reducer;
