import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userType = {
  name: string;
  username: string;
  bio: string;
  email: string;
  profile: string;
  cover: string;
  id: number | null;
} | null;

interface user {
  isAuth: boolean;
  isDarkMode: boolean;
  user: userType;
}

const initialState: user = {
  isAuth: false,
  isDarkMode: false,
  user: {
    id: null,
    bio: "",
    name: "",
    username: "",
    email: "",
    profile: "",
    cover: "",
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userType>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    toggleDarkMode: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.isDarkMode = true;
      else state.isDarkMode = false;
    },
  },
});

export const { login, logout, toggleDarkMode } = userSlice.actions;

export default userSlice.reducer;
