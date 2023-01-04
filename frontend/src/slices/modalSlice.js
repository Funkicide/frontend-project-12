/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  item: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.item = payload.item;
    },
    closeModal: (state) => {
      state.type = null;
      state.item = null;
    },
  },
});

export const { actions } = modalSlice;

export const modalSelectors = {
  type: (state) => state.modal.type,
  item: (state) => state.modal.item,
};

export default modalSlice.reducer;
