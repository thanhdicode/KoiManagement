import { createSlice, combineReducers } from "@reduxjs/toolkit";

const settingNavSlice = createSlice({
  name: "settingNav",
  initialState: { isToggleNav: false },
  reducers: {
    toggleSettingNav: (state) => {
      state.isToggleNav = !state.isToggleNav;
    },
  },
});
const itemInCartSlice = createSlice({
  name: "itemInCart",
  initialState: { quantity: 0 },
  reducers: {
    setQuantityItemInCart: (state, action) => {
      state.quantity = action.payload;
    },
  },
});
// Export the action
export const { toggleSettingNav } = settingNavSlice.actions;
export const { setQuantityItemInCart } = itemInCartSlice.actions;
// Combine reducers
const NavbarReducer = combineReducers({
  settingNav: settingNavSlice.reducer,
  itemInCart: itemInCartSlice.reducer,
});

export default NavbarReducer;
