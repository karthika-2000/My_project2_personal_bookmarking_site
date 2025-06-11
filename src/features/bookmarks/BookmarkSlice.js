import { createSlice } from '@reduxjs/toolkit';

const getStorageKey = (user) => `bookmarks_${user?.email}`;

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: [],
  },
  reducers: {
    loadBookmarks: (state, action) => {
      const user = action.payload;
      const key = getStorageKey(user);
      state.items = JSON.parse(localStorage.getItem(key)) || [];
    },
    addBookmark: (state, action) => {
      const { user, bookmark } = action.payload;
      const key = getStorageKey(user);
      const current = JSON.parse(localStorage.getItem(key)) || [];

      if (current.length >=5) {
        return
      }

      

      const updated = [...current, { ...bookmark, time: new Date().toLocaleString() }];
      localStorage.setItem(key, JSON.stringify(updated));
      state.items = updated;

      return 

    },
    deleteBookmark: (state, action) => {
      const { user, index } = action.payload;
      const key = getStorageKey(user);
      const current = JSON.parse(localStorage.getItem(key)) || [];
      current.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(current));
      state.items = current;
    },
    editBookmark: (state, action) => {
      const { user, index, updatedBookmark } = action.payload;
      const key = getStorageKey(user);
      const current = JSON.parse(localStorage.getItem(key)) || [];
      current[index] = { ...updatedBookmark, time: new Date().toLocaleString() };
      localStorage.setItem(key, JSON.stringify(current));
      state.items = current;
    },
  },
});

export const { loadBookmarks, addBookmark, deleteBookmark, editBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
