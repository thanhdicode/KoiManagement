import { createSlice, combineReducers } from "@reduxjs/toolkit";
const koiSlice = createSlice({
  name: "koiId",
  initialState: {
    koiId: "",
  },
  reducers: {
    setKoiId: (state, action) => {
      state.koiId = action.payload;
    },
    getKoiId: (state) => {
      return state.productId;
    },
  },
});

// Export the action
export const { setKoiId, getKoiId } = koiSlice.actions;

// Combine reducers
const KoiReducer = combineReducers({
  koiId: koiSlice.reducer,
});

export default KoiReducer;
