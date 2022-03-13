import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../../../types/types";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    history: {} as { [user: string]: Message[] },
  },
  reducers: {
    saveSentMessage: (state, action) => {
      const dateObj = new Date();
      const date = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
      const [sender, recepient, message] = action.payload as messagePayload;
      const msg = { by: sender, message: message, time: date };
      state.history[recepient]
        ? state.history[recepient].push(msg)
        : (state.history[recepient] = [msg]);
    },
    saveReceivedMessage: (state, action) => {
      const date = new Date().toUTCString();
      const [sender, message] = action.payload as messagePayload;
      const msg = { by: sender, message: message, time: date };
      state.history[sender]
        ? state.history[sender].push(msg)
        : (state.history[sender] = [msg]);
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveSentMessage, saveReceivedMessage } = chatSlice.actions;

export default chatSlice.reducer;

type messagePayload = [string, string, string];
