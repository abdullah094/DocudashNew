import { configureStore } from '@reduxjs/toolkit';
import accessToken from './Slices';
// ...

const store = configureStore({
  reducer: {
    accessToken: accessToken,
  },
});

export default store;
