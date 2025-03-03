import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import bookmarksReducer from './slices/bookmarksSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    bookmarks: bookmarksReducer,
  },
});

export default store;