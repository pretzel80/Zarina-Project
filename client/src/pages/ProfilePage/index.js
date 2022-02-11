import { createSlice } from '@reduxjs/toolkit';
export const profileReducer = createSlice({
  name: 'profileReducer',
  initialState: {
    user: null,
    orders: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setUser, setOrders } = profileReducer.actions;
//
export default profileReducer.reducer;
