import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    list: [] as { name: string; isOnline: boolean }[],
  },
  reducers: {
    load: (state, action) => {
      state.list.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { load } = friendsSlice.actions;

export default friendsSlice.reducer;
