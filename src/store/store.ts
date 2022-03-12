import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./slices/friends-slice";

export default configureStore({
  reducer: {
    friends: friendsReducer,
  },
});
