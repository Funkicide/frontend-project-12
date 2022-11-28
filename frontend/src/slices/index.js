import { configureStore } from '@reduxjs/toolkit';

import channelsSlice, { actions as channelsActions } from './channelsSlice.js';
import messagesSlice, { actions as messagesActions } from './messagesSlice.js';
import modalSlice, { actions as modalActions } from './modalSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modal: modalSlice,
  },
});

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};
