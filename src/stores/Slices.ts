import { createSlice } from '@reduxjs/toolkit';
import { IUserSlice } from '../types/userSlice';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: null,
    profile: {},
    wishList: [],
    routeName: 'Home',
  } as IUserSlice,

  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logoutUser(state) {
      state.accessToken = null;
    },
    setProfileData(state, action) {
      state.profile = { ...action.payload };
    },
    removeProfileData(state) {
      state.profile = {};
    },
    setWishList(state, action) {
      state.wishList = action.payload;
    },
    AddToWishlist(state, action) {
      state.wishList.push(action.payload);
    },
    RemoveFromWishList(state, action) {
      state.wishList = state.wishList.filter((x) => x != action.payload);
    },
    setRouteName: (state, action) => {
      state.routeName = action.payload;
    },
  },
});

// Selectors
export const selectAccessToken = (state: { user: IUserSlice }) => state.user.accessToken;
export const selectProfileData = (state: { user: IUserSlice }) => state.user.profile;
export const selectWishlist = (state: { user: IUserSlice }) => state.user.wishList;
export const selectRouteName = (state: { user: IUserSlice }) => state.user.routeName;

export const {
  setAccessToken,
  logoutUser,
  setProfileData,
  removeProfileData,
  setWishList,
  AddToWishlist,
  RemoveFromWishList,
  setRouteName,
} = UserSlice.actions;
export default UserSlice.reducer;
