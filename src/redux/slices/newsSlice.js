import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewsByCategory, searchNews } from '../../api/newsApi';

export const fetchNews = createAsyncThunk(
  'news/fetchByCategory',
  async ({ category, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await fetchNewsByCategory(category, page, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchNewsThunk = createAsyncThunk(
  'news/search',
  async ({ query, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await searchNews(query, page, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    currentCategory: null,
    searchResults: [],
    searchQuery: '',
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.searchResults = [];
      state.page = 1;
      state.hasMore = true;
    },
    resetNews: (state) => {
      state.articles = [];
      state.searchResults = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        const newArticles = action.payload.articles || [];
     
        if (state.page === 1) {
          state.articles = newArticles;
        } else {
          state.articles = [...state.articles, ...newArticles];
        }
        
        state.hasMore = newArticles.length > 0;
        state.page += 1;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchNewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newResults = action.payload.articles || [];
        
        if (state.page === 1) {
          state.searchResults = newResults;
        } else {
          state.searchResults = [...state.searchResults, ...newResults];
        }
        
        state.hasMore = newResults.length > 0;
        state.page += 1;
      })
      .addCase(searchNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCategory, setSearchQuery, resetNews } = newsSlice.actions;
export default newsSlice.reducer;