import { createSlice } from '@reduxjs/toolkit';

import { actions as channelActions } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    addMessages: (state, { payload }) => {
      state.messages = payload.messages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      })
      .addCase(channelActions.removeChannel, (state, { payload: { channelId } }) => {
        state.messages = state.messages.filter((message) => message.channelId !== channelId);
      });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
