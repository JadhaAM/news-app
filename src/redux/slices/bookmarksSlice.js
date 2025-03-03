import { createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    savedArticles: [],
  },
  reducers: {
    saveArticle: (state, action) => {
      const articleExists = state.savedArticles.some(
        article => article.url === action.payload.url
      );
      
      if (!articleExists) {
        state.savedArticles.push(action.payload);
      }
    },
    removeArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        article => article.url !== action.payload.url
      );
    },
  },
});

export const { saveArticle, removeArticle } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;