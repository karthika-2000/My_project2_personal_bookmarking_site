import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/Authslice';
import BookmarkReducer from '../features/bookmarks/BookmarkSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    bookmarks: BookmarkReducer,
  },
});

export default store;
