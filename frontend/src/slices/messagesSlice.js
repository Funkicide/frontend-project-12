/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { actions as channelActions, fetchData } from './channelsSlice.js';

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
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      })
      .addCase(
        channelActions.removeChannel,
        (state, { payload: { channelId } }) => {
          state.messages = state.messages.filter(
            (message) => message.channelId !== channelId
          );
        }
      );
  },
});

export const { actions } = messagesSlice;

export const messagesSelector = (state) => state.messagesInfo.messages;

export default messagesSlice.reducer;
