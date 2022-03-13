import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    history: {} as { [user: string]: string[] },
  },
  reducers: {
    saveMessage: (state, action) => {
      const [name, message] = action.payload as [string, string];
      console.log(name, message);
      state.history[name];
      console.log(state.history[name]);
      state.history[name]
        ? state.history[name].push(message)
        : (state.history[name] = [message]);
      console.log(history);
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveMessage } = chatSlice.actions;

export default chatSlice.reducer;
