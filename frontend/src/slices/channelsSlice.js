/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
    },
    removeChannel: (state, { payload: { channelId } }) => {
      state.channels = state.channels.filter(({ id }) => id !== channelId);
    },
    setCurrentChannel: (state, { payload: { channelId } }) => {
      state.currentChannelId = channelId;
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const channelToRename = state.channels.find((channel) => channel.id === id);
      channelToRename.name = name;
    },
    setInitialState: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
