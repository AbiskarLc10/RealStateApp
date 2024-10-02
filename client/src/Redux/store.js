import { configureStore,combineReducers } from '@reduxjs/toolkit'
import  themeReducer  from './Theme/ThemeSlice'
import userReducer from './Theme/userSlice'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore } from 'redux-persist';


const rootReducers = combineReducers({
  theme: themeReducer,
  user: userReducer
});

const persistConfigue = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfigue, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  })
})

export const persistor = persistStore(store);