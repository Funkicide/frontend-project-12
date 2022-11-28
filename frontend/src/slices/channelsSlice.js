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
      state.channels = [...state.channels, ...payload.channel];
    },
    removeChannel: (state, { payload: { channelId } }) => {
      state.channels = state.channels.filter(({ id }) => id !== channelId);
    },
    setCurrentChannel: (state, { payload: { channelId } }) => {
      state.currentChannelId = channelId;
    },
    renameChannel: (state, { payload: { channelId, channelName } }) => {
      const channelToRename = state.channels.find(({ id }) => id === channelId);
      channelToRename.name = channelName;
    },
    setInitialState: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
