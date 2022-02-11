import { createSlice } from '@reduxjs/toolkit';

export const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState: {
    value: false,
  },
  reducers: {
    openModal: state => {
      state.value = true;
    },
    closeModal: state => {
      state.value = false;
    },
  },
});

export const { openModal, closeModal } = loginModalSlice.actions;
//
export default loginModalSlice.reducer;
