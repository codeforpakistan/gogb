import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice';
import lawReducer from './lawSlice';
import priceControlReducer from './priceControlSlice'; 
import addressReducer from './addressSlice';
import lawTypesReducer from './lawTypesSlice'; 
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'law', 'priceControl', 'addresses', 'lawTypes'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  law: lawReducer,
  priceControl: priceControlReducer,
  addresses: addressReducer,
  lawTypes: lawTypesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
