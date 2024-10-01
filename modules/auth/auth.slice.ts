import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './auth.types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  persistedToken: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      console.log(action.payload);
      state.user = action.payload;
    },
    logout(state) {
      console.log('logout');
      state.isAuthenticated = false;
      state.user = null;
      state.persistedToken = '';
    },
    updateCurrentUser(state, action) {
      state.user = action.payload;
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      state.persistedToken = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const authReducer = authSlice.reducer;
