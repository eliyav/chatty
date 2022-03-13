import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./slices/friends-slice";
import chatReducer from "./slices/chat-slice";

export default configureStore({
  reducer: {
    friends: friendsReducer,
    chat: chatReducer,
  },
});
