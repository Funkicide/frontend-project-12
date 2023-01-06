/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const fetchData = createAsyncThunk(
  'channelsInfo/fetchData',
  async (authHeader) => {
    const { data } = await axios.get(routes.api.usersPath(), {
      headers: authHeader,
    });

    return data;
  }
);

const initialState = {
  channels: [],
  currentChannelId: null,
  loadingStatus: 'idle',
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
      const channelToRename = state.channels.find(
        (channel) => channel.id === id
      );
      channelToRename.name = name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
        state.loadingStatus = 'loaded';
      })
      .addCase(fetchData.rejected, (state) => {
        state.loadingStatus = 'failed';
      });
  },
});

export const { actions } = channelsSlice;

export const channelsSelectors = {
  channels: (state) => state.channelsInfo.channels,
  currentChannelId: (state) => state.channelsInfo.currentChannelId,
  channelName: (channel) => channel.name,
  loadingStatus: (state) => state.channelsInfo.loadingStatus,
};

export default channelsSlice.reducer;
