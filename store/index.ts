import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '../modules/auth/auth.api';
import { authSlice } from '../modules/auth/auth.slice';
import { userApi } from '../modules/users/api/user.api';
import { dashboardApi } from '../modules/dasboard/api/dashboard.api';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authSlice', 'productPricingSlice'],
};

const reducers = {
  /** Auth Module */
  [authSlice.name]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,

  /** User Module */
  [userApi.reducerPath]: userApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
};

// console.log('reducers', reducers);
export const rootReducer: Reducer<RootState> = (state, action: any) => {
  if (action.type === FLUSH) {
    state = undefined;
  }

  if (action.type === REHYDRATE) {
    state = {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === PERSIST) {
    state = {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === PURGE) {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // ignore reduxt persist actions
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
      //   thunk: {
      //     extraArgument:,
      //   },
    }).concat([
      authApi.middleware,
      userApi.middleware,
      dashboardApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
